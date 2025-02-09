"use client";
import React, { useEffect, useState } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import ct from "countries-and-timezones";
import { DateTime } from "luxon";

const TimezoneSelect = ({ form }: { form: any }) => {
  const [timezones, setTimezones] = useState<string[]>([]);
  const [userTimezone, setUserTimezone] = useState<string>("");

  useEffect(() => {
    // Get all timezones from countries-and-timezones
    const allTimezones = Object.keys(ct.getAllTimezones());
    setTimezones(allTimezones);

    // Get user's timezone from geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const guessedTimezone = DateTime.fromObject({ 
            zone: 'system' 
          }).zoneName; // Gets the system timezone
          setUserTimezone(guessedTimezone);
          form.setValue("timezone", guessedTimezone); // Set default timezone in form
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, [form]);

  return (
    <FormField
      control={form.control}
      name="timezone"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Timezone</FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} defaultValue={userTimezone}>
              <SelectTrigger>
                <SelectValue placeholder="Select Timezone" />
              </SelectTrigger>
              <SelectContent>
                {timezones.map((tz) => (
                  <SelectItem key={tz} value={tz}>
                    {tz}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TimezoneSelect;

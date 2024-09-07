import * as React from "react";
import { Button } from "@/components/ui/button";
import { FeatureCard } from "./FeatureCard";
import Meteors from "@/components/magicui/meteors";

const Page = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="min-h-[50vh] flex flex-col justify-center items-center text-center space-y-8">
      <Meteors number={30}/>
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900">
          Simplify Your Conference Management
        </h1>
        <p className="text-lg md:text-2xl text-gray-600 max-w-2xl">
          Manage submissions, reviews, and schedules effortlessly with our
          <span className="font-bold text-gray-800"> all-in-one conference management system.</span>
        </p>
        <Button className="text-lg px-8 py-4 mt-4 bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300">
          Get Started →
        </Button>
      </div>
      
      <div className="mt-16">
        <FeatureCard />
      </div>
    </div>
  );
}

export default Page;

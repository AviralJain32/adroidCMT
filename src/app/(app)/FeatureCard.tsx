// import * as React from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { FaTools, FaFileAlt, FaSearch, FaChartLine, FaClipboardList } from "react-icons/fa";

// const features = [
//   {
//     title: "Conference Creation & Management",
//     description: "Effortlessly create and manage your conferences with customizable settings. Set up submission deadlines, review processes, and more, all within a user-friendly interface designed to streamline the entire conference management process.",
//     icon: <FaTools size={40} className="text-blue-600" />,
//   },
//   {
//     title: "Paper Submission System",
//     description: "Simplify the paper submission process for authors with a guided workflow that ensures all necessary information is collected. Our system supports multiple formats and allows for easy revisions, making it easier for authors to submit their work and for organizers to manage submissions.",
//     icon: <FaFileAlt size={40} className="text-green-600" />,
//   },
//   {
//     title: "SmartSub Integration",
//     description: "Maximize your conference's visibility by integrating with SmartSub, a feature that lists all available conferences and makes them easily discoverable. This ensures a wider reach and higher participation, helping you attract top-tier submissions from around the world.",
//     icon: <FaSearch size={40} className="text-purple-600" />,
//   },
//   {
//     title: "Review Management & Feedback",
//     description: "Streamline the review process with tools that allow for easy assignment of reviewers, tracking of review progress, and management of feedback. This feature ensures a thorough and organized review process, improving the overall quality of conference submissions.",
//     icon: <FaClipboardList size={40} className="text-red-600" />,
//   },
//   {
//     title: "Dynamic Dashboard",
//     description: "Get a comprehensive overview of all your activities, including conferences you're organizing and papers you've submitted. The dynamic dashboard provides real-time updates on submission statuses, upcoming deadlines, and review progress, helping you stay on top of everything.",
//     icon: <FaChartLine size={40} className="text-yellow-600" />,
//   },
// ];

// export function FeatureCard() {
//   return (
//     <div className="container mx-auto px-4 py-12">
//       <div className="text-center mb-12">
//         <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Features</h2>
//         <p className="text-lg text-gray-600">Discover the powerful tools designed to help you manage your conferences and submissions with ease.</p>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {features.map((feature, index) => (
//           <Card key={index} className="bg-white shadow-lg rounded-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300 p-6">
//             <CardHeader className="flex items-center space-x-4">
//               {feature.icon}
//               <CardTitle className="text-xl font-bold text-gray-800">{feature.title}</CardTitle>
//             </CardHeader>
//             <CardContent className="py-4">
//               <CardDescription className="text-sm text-gray-600 leading-relaxed">{feature.description}</CardDescription>
//             </CardContent>
//             {/* <CardFooter className="flex justify-end pt-4">
//               <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50 transition-colors duration-300">Learn More</Button>
//             </CardFooter> */}
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  FaTools,
  FaFileAlt,
  FaSearch,
  FaChartLine,
  FaClipboardList,
  FaLock,
  FaUsersCog,
  FaRegBell,
} from 'react-icons/fa';

const features = [
  {
    title: 'Conference Creation & Management',
    description:
      'Effortlessly create and manage your conferences with customizable settings. Set up submission deadlines, review processes, and more, all within a user-friendly interface designed to streamline the entire conference management process.',
    icon: <FaTools size={40} className="text-blue-600" />,
  },
  {
    title: 'Paper Submission System',
    description:
      'Simplify the paper submission process for authors with a guided workflow that ensures all necessary information is collected. Our system supports multiple formats and allows for easy revisions, making it easier for authors to submit their work and for organizers to manage submissions.',
    icon: <FaFileAlt size={40} className="text-green-600" />,
  },
  {
    title: 'SmartSub Integration',
    description:
      "Maximize your conference's visibility by integrating with SmartSub, a feature that lists all available conferences and makes them easily discoverable. This ensures a wider reach and higher participation, helping you attract top-tier submissions from around the world.",
    icon: <FaSearch size={40} className="text-purple-600" />,
  },
  {
    title: 'Review Management & Feedback',
    description:
      'Streamline the review process with tools that allow for easy assignment of reviewers, tracking of review progress, and management of feedback. This feature ensures a thorough and organized review process, improving the overall quality of conference submissions.',
    icon: <FaClipboardList size={40} className="text-red-600" />,
  },
  {
    title: 'Dynamic Dashboard',
    description:
      "Get a comprehensive overview of all your activities, including conferences you're organizing and papers you've submitted. The dynamic dashboard provides real-time updates on submission statuses, upcoming deadlines, and review progress, helping you stay on top of everything.",
    icon: <FaChartLine size={40} className="text-yellow-600" />,
  },
  // {
  //   title: "Secure User Authentication",
  //   description: "Ensure your data is protected with our robust authentication system. Users can securely log in and manage their profiles, ensuring that sensitive information remains confidential.",
  //   icon: <FaLock size={40} className="text-indigo-600" />,
  // },
  // {
  //   title: "Collaborative Tools",
  //   description: "Enhance teamwork with features that facilitate communication between organizers, reviewers, and authors. Collaborate seamlessly to ensure the success of your conferences.",
  //   icon: <FaUsersCog size={40} className="text-teal-600" />,
  // },
  {
    title: 'Notifications & Reminders',
    description:
      'Stay informed with automated notifications for important updates and deadlines. Our system keeps you and your participants in the loop with timely reminders.',
    icon: <FaRegBell size={40} className="text-orange-600" />,
  },
];

export function FeatureCard() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Features</h2>
        <p className="text-lg text-gray-600">
          Discover the powerful tools designed to help you manage your
          conferences and submissions with ease.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="bg-gradient-to-br from-white to-gray-50 shadow-lg rounded-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300 p-6"
          >
            <CardHeader className="flex items-center space-x-4">
              {feature.icon}
              <CardTitle className="text-xl font-bold text-gray-800">
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="py-4">
              <CardDescription className="text-sm text-gray-600 leading-relaxed">
                {feature.description}
              </CardDescription>
            </CardContent>
            <CardFooter className="flex justify-end pt-4">
              {/* <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50 transition-colors duration-300">
                Learn More
              </Button> */}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

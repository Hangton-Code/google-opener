"use client";

import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { BoltIcon } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

interface Account {
  name: string;
  number: string;
  avatar: string;
}

interface GoogleApp {
  name: string;
  url: string;
  icon: string;
}

const googleApps: GoogleApp[] = [
  { name: "Gmail", url: "https://mail.google.com/mail/u/", icon: "/mail.svg" },
  {
    name: "Google Drive",
    url: "https://drive.google.com/drive/u/",
    icon: "/drive.svg",
  },
  {
    name: "Google Docs",
    url: "https://docs.google.com/document/u/",
    icon: "/docs.svg",
  },
  {
    name: "Google Slides",
    url: "https://docs.google.com/presentation/u/",
    icon: "/slides.svg",
  },
  {
    name: "Google Sheets",
    url: "https://docs.google.com/spreadsheets/u/",
    icon: "/sheets.svg",
  },
  {
    name: "Google Forms",
    url: "https://docs.google.com/forms/",
    icon: "/forms.svg",
  },
  {
    name: "Google Classroom",
    url: "https://classroom.google.com/u/",
    icon: "/classroom.svg",
  },
];

const Home: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    const storedAccounts = JSON.parse(localStorage.getItem("accounts") || "[]");
    setAccounts(storedAccounts);
  }, []);

  const openApp = (appUrl: string, userNumber: string) => {
    window.open(`${appUrl}${userNumber}/`, "_blank");
  };

  return (
    <div className="w-screen h-screen relative flex flex-col justify-center items-center gap-12">
      <h1 className="text-2xl font-medium font-geist-mono">Google Opener</h1>
      <div className="flex flex-col gap-10">
        {accounts.map((account, index) => (
          <div key={index} className="flex justify-between gap-16">
            {account.avatar ? (
              <div className="pt-2">
                <img
                  src={account.avatar}
                  alt={account.name}
                  className="w-12 h-12 rounded-full"
                />
              </div>
            ) : (
              <h2>{account.name}</h2>
            )}
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-6 gap-8">
                {googleApps.map((app) => (
                  <Button
                    key={app.name}
                    onClick={() => openApp(app.url, account.number)}
                    className="w-fit h-fit p-2"
                    size="icon"
                    variant={"ghost"}
                  >
                    <img src={app.icon} alt={app.name} className="w-12 h-12" />
                  </Button>
                ))}
              </div>
              <div className="bg-border h-0.5 w-full"></div>
            </div>
          </div>
        ))}
      </div>
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 bottom-4"
        asChild
      >
        <Link href="/settings">
          <BoltIcon className="h-4 w-4" />
        </Link>
      </Button>
      <div className="absolute right-4 bottom-4">
        <ModeToggle />
      </div>
    </div>
  );
};

export default Home;

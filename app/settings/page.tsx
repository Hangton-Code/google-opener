"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, BadgeMinusIcon } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

interface Account {
  name: string;
  number: string;
  avatar: string;
}

const Settings: React.FC = () => {
  const [initialized, setInitialized] = useState(false);
  const [accounts, setAccounts] = useState<Account[]>([
    { name: "", number: "", avatar: "" },
  ]);

  useEffect(() => {
    const storedAccounts = JSON.parse(localStorage.getItem("accounts") || "[]");
    setAccounts(storedAccounts);
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      localStorage.setItem("accounts", JSON.stringify(accounts));
    }
  }, [accounts]);

  const addAccount = () => {
    setAccounts([...accounts, { name: "", number: "", avatar: "" }]);
  };

  const updateAccount = (
    index: number,
    field: keyof Account,
    value: string
  ) => {
    const updatedAccounts = accounts.map((account, i) =>
      i === index ? { ...account, [field]: value } : account
    );
    setAccounts(updatedAccounts);
  };

  const removeAccount = (index: number) => {
    const updatedAccounts = accounts.filter((_, i) => i !== index);
    setAccounts(updatedAccounts);
  };

  return (
    <div className="w-screen h-screen relative flex flex-col justify-center items-center gap-8">
      <h1 className="text-2xl font-medium font-geist-mono">Accounts Setting</h1>
      <div>
        <div>
          <input
            type="text"
            placeholder="User Name"
            value={"User Name"}
            onChange={() => {}}
            readOnly
          />
          <input
            type="text"
            placeholder="User Number"
            value={"User Number"}
            onChange={() => {}}
            readOnly
          />
          <input
            type="text"
            placeholder="Avatar URL"
            value={"Avatar URL"}
            onChange={() => {}}
            className="w-80"
            readOnly
          />
        </div>
        {accounts.map((account, index) => (
          <div key={index} className="flex items-center">
            <input
              type="text"
              placeholder="User Name"
              value={account.name}
              onChange={(e) => updateAccount(index, "name", e.target.value)}
              className="h-11"
            />
            <input
              type="text"
              placeholder="User Number"
              value={account.number}
              onChange={(e) => updateAccount(index, "number", e.target.value)}
              className="h-11"
            />
            <input
              type="text"
              placeholder="Avatar URL"
              value={account.avatar}
              onChange={(e) => updateAccount(index, "avatar", e.target.value)}
              className="w-80 h-11"
            />
            <Button
              onClick={() => removeAccount(index)}
              size="icon"
              variant={"destructive"}
              className="ml-2"
            >
              <BadgeMinusIcon />
            </Button>
          </div>
        ))}
      </div>

      <Button variant={"secondary"} onClick={addAccount}>
        Add Account
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-4"
        asChild
      >
        <Link href="/">
          <ArrowLeft className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
};

export default Settings;

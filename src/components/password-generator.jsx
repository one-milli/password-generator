"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { CopyIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("alphaNumeric");
  const [passwordLength, setPasswordLength] = useState(12);
  const [showTooltip, setShowTooltip] = useState(false);

  const generatePassword = () => {
    let chars = "";

    switch (passwordType) {
      case "alphabetic":
        chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        break;
      case "alphaNumeric":
        chars =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        break;
      case "complex":
        chars =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
        break;
      default:
        chars =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    }

    let newPassword = "";
    for (let i = 0; i < passwordLength; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    setPassword(newPassword);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(() => {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
    });
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>パスワードジェネレーター</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={passwordType}
          onValueChange={setPasswordType}
          className="mb-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="alphabetic" id="alphabetic" />
            <Label htmlFor="alphabetic">英字のみ</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="alphaNumeric" id="alphaNumeric" />
            <Label htmlFor="alphaNumeric">英数字</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="complex" id="complex" />
            <Label htmlFor="complex">記号+英数字</Label>
          </div>
        </RadioGroup>
        <div className="mb-4">
          <Label htmlFor="password-length">
            パスワードの長さ: {passwordLength}
          </Label>
          <Slider
            id="password-length"
            min={1}
            max={24}
            step={1}
            value={[passwordLength]}
            onValueChange={(value) => setPasswordLength(value[0])}
            className="mt-2"
          />
        </div>
        <div className="flex mb-4">
          <Input
            type="text"
            value={password}
            readOnly
            className="flex-grow"
            placeholder="生成されたパスワード"
          />
          <TooltipProvider>
            <Tooltip open={showTooltip}>
              <TooltipTrigger asChild>
                <Button
                  onClick={copyToClipboard}
                  className="ml-2"
                  variant="outline"
                  disabled={!password}
                >
                  <CopyIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copied!</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Button onClick={generatePassword} className="w-full">
          パスワードを生成
        </Button>
      </CardContent>
    </Card>
  );
};

export default PasswordGenerator;

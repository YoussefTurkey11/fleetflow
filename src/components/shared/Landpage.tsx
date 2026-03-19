"use client";
import { Star } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { RootState, useAppSelector } from "@/redux/store";

interface ReviewerData {
  id: number;
  avatarUrl: string;
  fallback: string;
}

const reviewers: ReviewerData[] = [
  {
    id: 1,
    avatarUrl: "https://notion-avatars.netlify.app/api/avatar?preset=male-1",
    fallback: "U1",
  },
  {
    id: 2,
    avatarUrl: "https://notion-avatars.netlify.app/api/avatar?preset=female-1",
    fallback: "U2",
  },
  {
    id: 3,
    avatarUrl: "https://notion-avatars.netlify.app/api/avatar?preset=male-2",
    fallback: "U3",
  },
  {
    id: 4,
    avatarUrl: "https://notion-avatars.netlify.app/api/avatar?preset=female-2",
    fallback: "U4",
  },
  {
    id: 5,
    avatarUrl: "https://notion-avatars.netlify.app/api/avatar?preset=male-3",
    fallback: "U5",
  },
];

const Landpage = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);
  return (
    <div className="container mx-auto px-4 md:px-6">
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="space-y-8 text-center lg:text-start">
          <header className="space-y-4">
            <Badge
              variant="outline"
              className="text-muted-foreground px-3.5 py-1"
            >
              Premium Dashboard
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-balance md:text-5xl">
              Welcome to FleetFlow
            </h1>
            <p className="text-muted-foreground text-balance md:text-lg">
              FleetFlow is a modern fleet management system designed to help
              companies efficiently manage trucks, drivers, and loads in one
              centralized platform. The system provides real-time insights into
              fleet availability, load distribution, and operational status,
              allowing administrators to monitor and control logistics
              operations smoothly.
            </p>
          </header>

          <Button
            nativeButton={false}
            size="lg"
            className="cursor-pointer text-base"
            render={
              <Link href={user ? "/admin" : "/login"}>View Live Demo</Link>
            }
          />

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <div className="flex -space-x-3">
              {reviewers.map((reviewer) => (
                <Avatar
                  key={reviewer.id}
                  className="ring-background bg-muted relative size-10 ring-2 transition-transform hover:z-10 hover:scale-110"
                >
                  <AvatarImage
                    src={reviewer.avatarUrl}
                    alt={`User ${reviewer.id}`}
                  />
                  <AvatarFallback className="text-xs">
                    {reviewer.fallback}
                  </AvatarFallback>
                </Avatar>
              ))}
              <div className="border-background bg-accent relative -ms-1.5 flex size-10 items-center justify-center rounded-full border-2">
                <span className="text-xs font-medium">+5</span>
              </div>
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center justify-center gap-1 lg:justify-start">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="fill-foreground size-4" />
                ))}
                <span className="ms-2 text-sm font-medium">(15)</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Trusted by 1000+ developers
              </p>
            </div>
          </div>
        </div>

        <div className="relative aspect-8.5/4 overflow-hidden rounded-xl border">
          <Image
            src="/images/screenShoot.png"
            alt="ShadcnStore Showcase"
            className="size-full object-cover dark:brightness-[0.95] dark:invert"
            fill
          />
        </div>
      </div>
    </div>
  );
};

export default Landpage;

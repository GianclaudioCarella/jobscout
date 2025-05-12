import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";

export default function Home() {
  return (
    <div className="w-full max-w-2xl mx-auto p-4 flex flex-col space-y-6">
      <h1 className="text-xl mb-8 mt-4 uppercase tracking-wide">
        Jobscout Search
      </h1>

      {/* General Info */}
      <section className="mb-8">
        <h4 className="mb-4 p-1 text-xs tracking-wider uppercase font-mono bg-slate-100">
          General Info
        </h4>
        <Label htmlFor="roles" className="block mb-1 font-medium">
          What kind of role are you looking for?
        </Label>
        <p className="italic text-sm text-muted-foreground mb-2">
          Add roles or keywords separated by commas
        </p>
        <Input id="roles" type="text" placeholder="Product Designer, Web3" />
      </section>

      

      {/* Optional Filters */}
      <section className="mb-8">
        <h4 className="mb-4 p-1 text-xs tracking-wider uppercase font-mono bg-slate-100">
          Optional Filters
        </h4>

        <Label htmlFor="companies" className="block mb-1 font-medium">
          Where would you like to work?
        </Label>
        <p className="italic text-sm text-muted-foreground mb-2">
          Add companies separated by commas (optional)
        </p>
        <Input id="companies" type="text" placeholder="Spotify, Notion" />

        <div className="mt-4">
          <Label htmlFor="industries" className="block mb-1 font-medium">
            Which industries would you like to work in?
          </Label>
          <p className="italic text-sm text-muted-foreground mb-2">
            Add industries separated by commas (optional)
          </p>
          <Input
            id="industries"
            type="text"
            placeholder="Healthcare, Fintech"
          />
        </div>
      </section>

      

      {/* Preferences */}
      <section>
        <h4 className="mb-4 p-1 text-xs tracking-wider uppercase font-mono bg-slate-100">
          Preferences
        </h4>

        <Label htmlFor="locations" className="block mb-1 font-medium">
          Where would you like to work from?
        </Label>
        <p className="italic text-sm text-muted-foreground mb-2">
          Add locations separated by commas
        </p>
        <Input id="locations" type="text" placeholder="Barcelona, London" />

        <div className="flex items-center space-x-2 mt-4">
          <Checkbox id="remote" />
          <Label
            htmlFor="remote"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Look for remote positions
          </Label>
        </div>
      </section>

      {/* CTA Button */}
      <Button className="mt-6 self-start">Search Jobs</Button>
    </div>
  );
}

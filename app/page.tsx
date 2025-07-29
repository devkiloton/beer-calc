"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BeerLambertCalculator } from "@/components/beer-lambert-calculator"
import { MaterialComparison } from "@/components/material-comparison"
import { ShieldingDesign } from "@/components/shielding-design"
import { PhysicsBackground } from "@/components/physics-background"
import { Atom, Shield, BarChart3, BookOpen } from "lucide-react"

export default function XRayPhysicsApp() {
  return (
    <div className="min-h-screen bg-gradient-to-br p-4">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">X-Ray & Gamma-Ray Physics Interactive</h1>
          <p className="text-lg text-gray-600">
            Explore radiation interactions, attenuation coefficients, and shielding design
          </p>
        </div>

        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="calculator" className="flex items-center gap-2">
              <Atom className="h-4 w-4" />
              Beer-Lambert Law
            </TabsTrigger>
            <TabsTrigger value="comparison" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Material Comparison
            </TabsTrigger>
            <TabsTrigger value="shielding" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Shielding Design
            </TabsTrigger>
            <TabsTrigger value="background" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Physics Background
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculator">
            <BeerLambertCalculator />
          </TabsContent>

          <TabsContent value="comparison">
            <MaterialComparison />
          </TabsContent>

          <TabsContent value="shielding">
            <ShieldingDesign />
          </TabsContent>

          <TabsContent value="background">
            <PhysicsBackground />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

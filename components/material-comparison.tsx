"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const materials = {
  lead: { name: "Lead", color: "#8b5cf6", density: 11.34 },
  aluminum: { name: "Aluminum", color: "#06b6d4", density: 2.7 },
  concrete: { name: "Concrete", color: "#84cc16", density: 2.35 },
  steel: { name: "Steel", color: "#f59e0b", density: 7.87 },
  water: { name: "Water", color: "#3b82f6", density: 1.0 },
}

const attenuationData = {
  lead: { 50: 5.2, 100: 1.8, 200: 0.65, 500: 0.18, 1000: 0.08, 1500: 0.06 },
  aluminum: { 50: 0.35, 100: 0.18, 200: 0.12, 500: 0.08, 1000: 0.06, 1500: 0.05 },
  concrete: { 50: 0.28, 100: 0.16, 200: 0.11, 500: 0.08, 1000: 0.06, 1500: 0.05 },
  steel: { 50: 2.1, 100: 0.85, 200: 0.35, 500: 0.12, 1000: 0.08, 1500: 0.06 },
  water: { 50: 0.22, 100: 0.15, 200: 0.11, 500: 0.08, 1000: 0.07, 1500: 0.06 },
}

export function MaterialComparison() {
  const [selectedMaterials, setSelectedMaterials] = useState({
    lead: true,
    aluminum: true,
    concrete: false,
    steel: false,
    water: false,
  })
  const [thickness, setThickness] = useState([2.0])

  const toggleMaterial = (material: string) => {
    setSelectedMaterials((prev) => ({
      ...prev,
      [material]: !prev[material as keyof typeof prev],
    }))
  }

  // Generate comparison data
  const generateComparisonData = () => {
    const energies = [50, 100, 200, 500, 1000, 1500]
    return energies.map((energy) => {
      const dataPoint: any = { energy }

      Object.entries(selectedMaterials).forEach(([material, isSelected]) => {
        if (isSelected) {
          const mu =
            attenuationData[material as keyof typeof attenuationData][energy as keyof typeof attenuationData.lead]
          const transmission = Math.exp(-mu * thickness[0]) * 100
          dataPoint[material] = transmission
        }
      })

      return dataPoint
    })
  }

  const comparisonData = generateComparisonData()

  // Generate half-value layer data
  const generateHVLData = () => {
    const energies = [50, 100, 200, 500, 1000, 1500]
    return energies.map((energy) => {
      const dataPoint: any = { energy }

      Object.entries(selectedMaterials).forEach(([material, isSelected]) => {
        if (isSelected) {
          const mu =
            attenuationData[material as keyof typeof attenuationData][energy as keyof typeof attenuationData.lead]
          const hvl = Math.log(2) / mu
          dataPoint[material] = hvl
        }
      })

      return dataPoint
    })
  }

  const hvlData = generateHVLData()

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Material Selection</CardTitle>
            <CardDescription>Choose materials to compare</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(materials).map(([key, material]) => (
              <div key={key} className="flex items-center space-x-2">
                <Checkbox
                  id={key}
                  checked={selectedMaterials[key as keyof typeof selectedMaterials]}
                  onCheckedChange={() => toggleMaterial(key)}
                />
                <label htmlFor={key} className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: material.color }} />
                    <span className="font-medium">{material.name}</span>
                  </div>
                  <div className="text-sm text-gray-500">ρ = {material.density} g/cm³</div>
                </label>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Parameters</CardTitle>
            <CardDescription>Adjust comparison settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Thickness: {thickness[0].toFixed(1)} cm</Label>
              <Slider value={thickness} onValueChange={setThickness} min={0.5} max={10} step={0.1} className="w-full" />
            </div>

            <div className="rounded-lg bg-blue-50 p-4">
              <div className="text-sm font-medium text-blue-600 mb-2">Analysis</div>
              <div className="text-xs text-blue-800">
                Compare how different materials attenuate X-rays and gamma rays across various energies. Lower
                transmission percentages indicate better shielding.
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Material Properties</CardTitle>
            <CardDescription>Key characteristics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(materials)
                .filter(([key]) => selectedMaterials[key as keyof typeof selectedMaterials])
                .map(([key, material]) => (
                  <div key={key} className="rounded-lg border p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="h-2 w-2 rounded-full" style={{ backgroundColor: material.color }} />
                      <span className="font-medium text-sm">{material.name}</span>
                    </div>
                    <div className="text-xs text-gray-600">Density: {material.density} g/cm³</div>
                    <div className="text-xs text-gray-600">
                      Z_eff:{" "}
                      {key === "lead"
                        ? "82"
                        : key === "aluminum"
                          ? "13"
                          : key === "steel"
                            ? "26"
                            : key === "concrete"
                              ? "11"
                              : "7.4"}
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Transmission vs Energy</CardTitle>
            <CardDescription>Percentage of radiation transmitted through {thickness[0]} cm thickness</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="energy" label={{ value: "Energy (keV)", position: "insideBottom", offset: -5 }} />
                  <YAxis label={{ value: "Transmission (%)", angle: -90, position: "insideLeft" }} domain={[0, 100]} />
                  <Tooltip
                    formatter={(value: number, name: string) => [
                      `${value.toFixed(1)}%`,
                      materials[name as keyof typeof materials]?.name || name,
                    ]}
                    labelFormatter={(value: number) => `Energy: ${value} keV`}
                  />
                  <Legend />
                  {Object.entries(selectedMaterials).map(
                    ([material, isSelected]) =>
                      isSelected && (
                        <Line
                          key={material}
                          type="monotone"
                          dataKey={material}
                          stroke={materials[material as keyof typeof materials].color}
                          strokeWidth={2}
                          name={material}
                        />
                      ),
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Half-Value Layer vs Energy</CardTitle>
            <CardDescription>Thickness required to reduce intensity by 50%</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={hvlData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="energy" label={{ value: "Energy (keV)", position: "insideBottom", offset: -5 }} />
                  <YAxis
                    label={{ value: "HVL (cm)", angle: -90, position: "insideLeft" }}
                    scale="log"
                    domain={["dataMin", "dataMax"]}
                  />
                  <Tooltip
                    formatter={(value: number, name: string) => [
                      `${value.toFixed(2)} cm`,
                      materials[name as keyof typeof materials]?.name || name,
                    ]}
                    labelFormatter={(value: number) => `Energy: ${value} keV`}
                  />
                  <Legend />
                  {Object.entries(selectedMaterials).map(
                    ([material, isSelected]) =>
                      isSelected && (
                        <Line
                          key={material}
                          type="monotone"
                          dataKey={material}
                          stroke={materials[material as keyof typeof materials].color}
                          strokeWidth={2}
                          name={material}
                        />
                      ),
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

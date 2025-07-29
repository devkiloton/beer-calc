"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Material database with attenuation coefficients (cm⁻¹) at different energies
const materials = {
  lead: {
    name: "Lead (Pb)",
    density: 11.34, // g/cm³
    coefficients: {
      50: 5.2, // keV
      100: 1.8,
      200: 0.65,
      500: 0.18,
      1000: 0.08,
      1500: 0.06,
    },
  },
  aluminum: {
    name: "Aluminum (Al)",
    density: 2.7,
    coefficients: {
      50: 0.35,
      100: 0.18,
      200: 0.12,
      500: 0.08,
      1000: 0.06,
      1500: 0.05,
    },
  },
  concrete: {
    name: "Concrete",
    density: 2.35,
    coefficients: {
      50: 0.28,
      100: 0.16,
      200: 0.11,
      500: 0.08,
      1000: 0.06,
      1500: 0.05,
    },
  },
  steel: {
    name: "Steel",
    density: 7.87,
    coefficients: {
      50: 2.1,
      100: 0.85,
      200: 0.35,
      500: 0.12,
      1000: 0.08,
      1500: 0.06,
    },
  },
  water: {
    name: "Water (H₂O)",
    density: 1.0,
    coefficients: {
      50: 0.22,
      100: 0.15,
      200: 0.11,
      500: 0.08,
      1000: 0.07,
      1500: 0.06,
    },
  },
}

export function BeerLambertCalculator() {
  const [material, setMaterial] = useState("lead")
  const [energy, setEnergy] = useState([500])
  const [thickness, setThickness] = useState([1.0])
  const [initialIntensity, setInitialIntensity] = useState([100])

  // Interpolate attenuation coefficient for given energy
  const getAttenuationCoefficient = (materialKey: string, energyKeV: number) => {
    const mat = materials[materialKey as keyof typeof materials]
    const energies = Object.keys(mat.coefficients)
      .map(Number)
      .sort((a, b) => a - b)

    if (energyKeV <= energies[0]) return mat.coefficients[energies[0] as keyof typeof mat.coefficients]
    if (energyKeV >= energies[energies.length - 1])
      return mat.coefficients[energies[energies.length - 1] as keyof typeof mat.coefficients]

    // Linear interpolation
    for (let i = 0; i < energies.length - 1; i++) {
      if (energyKeV >= energies[i] && energyKeV <= energies[i + 1]) {
        const x1 = energies[i]
        const x2 = energies[i + 1]
        const y1 = mat.coefficients[x1 as keyof typeof mat.coefficients]
        const y2 = mat.coefficients[x2 as keyof typeof mat.coefficients]
        return y1 + ((y2 - y1) * (energyKeV - x1)) / (x2 - x1)
      }
    }
    return 0.1
  }

  const mu = getAttenuationCoefficient(material, energy[0])
  const finalIntensity = initialIntensity[0] * Math.exp(-mu * thickness[0])
  const attenuationFactor = finalIntensity / initialIntensity[0]
  const halfValueLayer = Math.log(2) / mu
  const tenthValueLayer = Math.log(10) / mu

  // Generate data for attenuation curve
  const generateAttenuationData = () => {
    const data = []
    const maxThickness = thickness[0] * 3
    for (let t = 0; t <= maxThickness; t += maxThickness / 50) {
      const intensity = initialIntensity[0] * Math.exp(-mu * t)
      data.push({
        thickness: t,
        intensity: intensity,
        percentage: (intensity / initialIntensity[0]) * 100,
      })
    }
    return data
  }

  const attenuationData = generateAttenuationData()

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Beer-Lambert Law Calculator</CardTitle>
          <CardDescription>Calculate radiation attenuation: I = I₀ × e^(-μx)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Material</Label>
            <Select value={material} onValueChange={setMaterial}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(materials).map(([key, mat]) => (
                  <SelectItem key={key} value={key}>
                    {mat.name} (ρ = {mat.density} g/cm³)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Photon Energy: {energy[0]} keV</Label>
            <Slider value={energy} onValueChange={setEnergy} min={50} max={1500} step={10} className="w-full" />
          </div>

          <div className="space-y-2">
            <Label>Material Thickness: {thickness[0].toFixed(2)} cm</Label>
            <Slider value={thickness} onValueChange={setThickness} min={0.1} max={10} step={0.1} className="w-full" />
          </div>

          <div className="space-y-2">
            <Label>Initial Intensity: {initialIntensity[0]}%</Label>
            <Slider
              value={initialIntensity}
              onValueChange={setInitialIntensity}
              min={10}
              max={100}
              step={5}
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-blue-50 p-4">
              <div className="text-sm font-medium text-blue-600">Linear Attenuation Coefficient</div>
              <div className="text-2xl font-bold text-blue-900">{mu.toFixed(3)} cm⁻¹</div>
            </div>
            <div className="rounded-lg bg-green-50 p-4">
              <div className="text-sm font-medium text-green-600">Mass Attenuation Coefficient</div>
              <div className="text-2xl font-bold text-green-900">
                {(mu / materials[material as keyof typeof materials].density).toFixed(3)} cm²/g
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="font-medium">Final Intensity:</span>
              <Badge variant="secondary">{finalIntensity.toFixed(1)}%</Badge>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Attenuation Factor:</span>
              <Badge variant="secondary">{attenuationFactor.toFixed(3)}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Half-Value Layer:</span>
              <Badge variant="outline">{halfValueLayer.toFixed(2)} cm</Badge>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Tenth-Value Layer:</span>
              <Badge variant="outline">{tenthValueLayer.toFixed(2)} cm</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Attenuation Curve</CardTitle>
          <CardDescription>Intensity vs. material thickness</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={attenuationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="thickness" label={{ value: "Thickness (cm)", position: "insideBottom", offset: -5 }} />
                <YAxis label={{ value: "Intensity (%)", angle: -90, position: "insideLeft" }} />
                <Tooltip
                  formatter={(value: number, name: string) => [`${value.toFixed(1)}%`, "Intensity"]}
                  labelFormatter={(value: number) => `Thickness: ${value.toFixed(2)} cm`}
                />
                <Line type="monotone" dataKey="percentage" stroke="#2563eb" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 rounded-lg bg-gray-50 p-4">
            <div className="text-sm font-medium text-gray-700 mb-2">Current Calculation:</div>
            <div className="font-mono text-sm">
              I = {initialIntensity[0]}% × e^(-{mu.toFixed(3)} × {thickness[0]}) = {finalIntensity.toFixed(1)}%
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react"

const materials = {
  lead: { name: "Lead", density: 11.34, cost: 2.5, coefficients: { 100: 1.8, 500: 0.18, 1000: 0.08 } },
  aluminum: { name: "Aluminum", density: 2.7, cost: 1.8, coefficients: { 100: 0.18, 500: 0.08, 1000: 0.06 } },
  concrete: { name: "Concrete", density: 2.35, cost: 0.1, coefficients: { 100: 0.16, 500: 0.08, 1000: 0.06 } },
  steel: { name: "Steel", density: 7.87, cost: 0.8, coefficients: { 100: 0.85, 500: 0.12, 1000: 0.08 } },
  tungsten: { name: "Tungsten", density: 19.25, cost: 40, coefficients: { 100: 3.2, 500: 0.25, 1000: 0.12 } },
}

const radiationSources = {
  diagnostic_xray: { name: "Diagnostic X-ray", energy: 100, intensity: 1000 },
  therapy_xray: { name: "Therapy X-ray", energy: 250, intensity: 10000 },
  co60: { name: "Co-60 (γ)", energy: 1250, intensity: 5000 },
  cs137: { name: "Cs-137 (γ)", energy: 662, intensity: 3000 },
  ir192: { name: "Ir-192 (γ)", energy: 380, intensity: 2000 },
}

export function ShieldingDesign() {
  const [source, setSource] = useState("diagnostic_xray")
  const [material, setMaterial] = useState("lead")
  const [thickness, setThickness] = useState([2.0])
  const [distance, setDistance] = useState([100])
  const [targetReduction, setTargetReduction] = useState("99")
  const [occupancyFactor, setOccupancyFactor] = useState([1.0])

  const sourceData = radiationSources[source as keyof typeof radiationSources]
  const materialData = materials[material as keyof typeof materials]

  // Get attenuation coefficient (simplified interpolation)
  const getAttenuationCoefficient = () => {
    const coeffs = materialData.coefficients
    const energies = Object.keys(coeffs).map(Number)
    const energy = sourceData.energy

    if (energy <= 100) return coeffs[100 as keyof typeof coeffs]
    if (energy <= 500) {
      const ratio = (energy - 100) / 400
      return coeffs[100 as keyof typeof coeffs] * (1 - ratio) + coeffs[500 as keyof typeof coeffs] * ratio
    }
    if (energy <= 1000) {
      const ratio = (energy - 500) / 500
      return coeffs[500 as keyof typeof coeffs] * (1 - ratio) + coeffs[1000 as keyof typeof coeffs] * ratio
    }
    return coeffs[1000 as keyof typeof coeffs]
  }

  const mu = getAttenuationCoefficient()

  // Calculate shielding effectiveness
  const attenuationFactor = Math.exp(-mu * thickness[0])
  const shieldingReduction = (1 - attenuationFactor) * 100

  // Calculate dose rate (simplified)
  const unshieldedDoseRate = sourceData.intensity / Math.pow(distance[0], 2) // Inverse square law
  const shieldedDoseRate = unshieldedDoseRate * attenuationFactor * occupancyFactor[0]

  // Calculate required thickness for target reduction
  const targetFactor = (100 - Number.parseFloat(targetReduction)) / 100
  const requiredThickness = -Math.log(targetFactor) / mu

  // Cost calculation
  const volume = thickness[0] * 100 * 100 // Assuming 1m² shield
  const mass = volume * materialData.density
  const cost = mass * materialData.cost

  // Safety assessment
  const getSafetyLevel = () => {
    if (shieldingReduction >= 99.9) return { level: "excellent", icon: CheckCircle, color: "text-green-600" }
    if (shieldingReduction >= 99) return { level: "good", icon: CheckCircle, color: "text-green-600" }
    if (shieldingReduction >= 95) return { level: "adequate", icon: AlertTriangle, color: "text-yellow-600" }
    return { level: "insufficient", icon: XCircle, color: "text-red-600" }
  }

  const safety = getSafetyLevel()
  const SafetyIcon = safety.icon

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Radiation Source</CardTitle>
            <CardDescription>Select the radiation source</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Source Type</Label>
              <Select value={source} onValueChange={setSource}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(radiationSources).map(([key, src]) => (
                    <SelectItem key={key} value={key}>
                      {src.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-lg bg-blue-50 p-4">
              <div className="text-sm font-medium text-blue-600 mb-2">Source Properties</div>
              <div className="space-y-1 text-sm">
                <div>Energy: {sourceData.energy} keV</div>
                <div>Activity: {sourceData.intensity.toLocaleString()} units</div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Distance: {distance[0]} cm</Label>
              <Slider value={distance} onValueChange={setDistance} min={50} max={500} step={10} className="w-full" />
            </div>

            <div className="space-y-2">
              <Label>Occupancy Factor: {occupancyFactor[0].toFixed(2)}</Label>
              <Slider
                value={occupancyFactor}
                onValueChange={setOccupancyFactor}
                min={0.1}
                max={1.0}
                step={0.1}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Shield Design</CardTitle>
            <CardDescription>Configure shielding parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Shield Material</Label>
              <Select value={material} onValueChange={setMaterial}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(materials).map(([key, mat]) => (
                    <SelectItem key={key} value={key}>
                      {mat.name} (${mat.cost}/kg)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Thickness: {thickness[0].toFixed(1)} cm</Label>
              <Slider value={thickness} onValueChange={setThickness} min={0.1} max={20} step={0.1} className="w-full" />
            </div>

            <div className="space-y-2">
              <Label>Target Reduction (%)</Label>
              <Input
                type="number"
                value={targetReduction}
                onChange={(e) => setTargetReduction(e.target.value)}
                min="90"
                max="99.99"
                step="0.1"
              />
            </div>

            <div className="rounded-lg bg-orange-50 p-4">
              <div className="text-sm font-medium text-orange-600 mb-2">Recommended Thickness</div>
              <div className="text-lg font-bold text-orange-900">{requiredThickness.toFixed(2)} cm</div>
              <div className="text-xs text-orange-700">For {targetReduction}% reduction</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Analysis</CardTitle>
            <CardDescription>Shielding effectiveness</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <SafetyIcon className={`h-5 w-5 ${safety.color}`} />
              <span className="font-medium capitalize">{safety.level} Shielding</span>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Attenuation Factor:</span>
                <Badge variant="secondary">{attenuationFactor.toExponential(2)}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Reduction:</span>
                <Badge variant="secondary">{shieldingReduction.toFixed(2)}%</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Linear μ:</span>
                <Badge variant="outline">{mu.toFixed(3)} cm⁻¹</Badge>
              </div>
            </div>

            <div className="rounded-lg bg-gray-50 p-4">
              <div className="text-sm font-medium text-gray-600 mb-2">Dose Rate Estimate</div>
              <div className="space-y-1 text-sm">
                <div>Unshielded: {unshieldedDoseRate.toFixed(1)} units</div>
                <div>Shielded: {shieldedDoseRate.toFixed(3)} units</div>
              </div>
            </div>

            <div className="rounded-lg bg-green-50 p-4">
              <div className="text-sm font-medium text-green-600 mb-2">Cost Estimate</div>
              <div className="space-y-1 text-sm">
                <div>Mass: {mass.toFixed(1)} kg</div>
                <div>Cost: ${cost.toFixed(2)}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Design Recommendations</CardTitle>
          <CardDescription>Optimization suggestions based on your requirements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Thickness Optimization:</strong> Current thickness provides {shieldingReduction.toFixed(1)}%
                reduction.
                {shieldingReduction < 99
                  ? ` Consider increasing to ${requiredThickness.toFixed(1)} cm for 99% reduction.`
                  : " Excellent shielding achieved."}
              </AlertDescription>
            </Alert>

            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Material Selection:</strong> {materialData.name} offers good attenuation for {sourceData.energy}{" "}
                keV photons.
                {material === "lead"
                  ? " Lead provides excellent shielding but consider weight constraints."
                  : material === "concrete"
                    ? " Concrete is cost-effective for large barriers."
                    : " Consider lead for better space efficiency."}
              </AlertDescription>
            </Alert>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border p-4">
              <div className="text-sm font-medium text-gray-600 mb-2">Half-Value Layer</div>
              <div className="text-2xl font-bold">{(Math.log(2) / mu).toFixed(2)} cm</div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="text-sm font-medium text-gray-600 mb-2">Tenth-Value Layer</div>
              <div className="text-2xl font-bold">{(Math.log(10) / mu).toFixed(2)} cm</div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="text-sm font-medium text-gray-600 mb-2">Mass per m²</div>
              <div className="text-2xl font-bold">{(thickness[0] * materialData.density).toFixed(1)} kg</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

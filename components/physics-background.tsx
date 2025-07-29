"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export function PhysicsBackground() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>X-Ray and Gamma-Ray Physics</CardTitle>
          <CardDescription>Understanding electromagnetic radiation interactions with matter</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="interactions" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="interactions">Interactions</TabsTrigger>
              <TabsTrigger value="attenuation">Attenuation</TabsTrigger>
              <TabsTrigger value="equations">Equations</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
            </TabsList>

            <TabsContent value="interactions" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Photoelectric Effect</CardTitle>
                    <Badge variant="secondary">Low Energy (&lt; 100 keV)</Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-3">
                      Complete absorption of photon by inner shell electron. Dominant at low energies and high atomic
                      numbers.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>Energy dependence:</strong> ∝ E⁻³
                      </div>
                      <div>
                        <strong>Z dependence:</strong> ∝ Z⁴⁻⁵
                      </div>
                      <div>
                        <strong>Result:</strong> Photoelectron + characteristic X-rays
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Compton Scattering</CardTitle>
                    <Badge variant="secondary">Medium Energy (100 keV - 10 MeV)</Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-3">
                      Inelastic scattering with outer shell electrons. Dominant interaction in soft tissue.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>Energy dependence:</strong> ∝ E⁻¹
                      </div>
                      <div>
                        <strong>Z dependence:</strong> ∝ Z
                      </div>
                      <div>
                        <strong>Result:</strong> Scattered photon + recoil electron
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Pair Production</CardTitle>
                    <Badge variant="secondary">High Energy (&gt; 1.022 MeV)</Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-3">
                      Photon converts to electron-positron pair in nuclear field. Threshold at 1.022 MeV.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>Energy dependence:</strong> ∝ E
                      </div>
                      <div>
                        <strong>Z dependence:</strong> ∝ Z²
                      </div>
                      <div>
                        <strong>Result:</strong> e⁻ + e⁺ pair
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Rayleigh Scattering</CardTitle>
                    <Badge variant="outline">Coherent Scattering</Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-3">
                      Elastic scattering with no energy loss. Minor contribution to total attenuation.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>Energy dependence:</strong> ∝ E⁻²
                      </div>
                      <div>
                        <strong>Z dependence:</strong> ∝ Z²
                      </div>
                      <div>
                        <strong>Result:</strong> Direction change only
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="attenuation" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Attenuation Coefficients</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-lg bg-blue-50 p-4">
                      <h4 className="font-medium text-blue-900 mb-2">Linear Attenuation Coefficient (μ)</h4>
                      <p className="text-sm text-blue-800 mb-2">
                        Probability of interaction per unit path length in material.
                      </p>
                      <div className="text-sm space-y-1">
                        <div>
                          <strong>Units:</strong> cm⁻¹
                        </div>
                        <div>
                          <strong>Depends on:</strong> Material density, atomic number, photon energy
                        </div>
                        <div>
                          <strong>Formula:</strong> μ = μ_pe + μ_c + μ_pp + μ_r
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg bg-green-50 p-4">
                      <h4 className="font-medium text-green-900 mb-2">Mass Attenuation Coefficient (μ/ρ)</h4>
                      <p className="text-sm text-green-800 mb-2">
                        Linear coefficient normalized by density. Material-independent property.
                      </p>
                      <div className="text-sm space-y-1">
                        <div>
                          <strong>Units:</strong> cm²/g
                        </div>
                        <div>
                          <strong>Advantage:</strong> Independent of physical state
                        </div>
                        <div>
                          <strong>Formula:</strong> μ/ρ = μ ÷ density
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-gray-50 p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Key Relationships</h4>
                    <div className="grid gap-2 md:grid-cols-2 text-sm">
                      <div>
                        <strong>Half-Value Layer:</strong> HVL = ln(2)/μ = 0.693/μ
                      </div>
                      <div>
                        <strong>Tenth-Value Layer:</strong> TVL = ln(10)/μ = 2.303/μ
                      </div>
                      <div>
                        <strong>Mean Free Path:</strong> λ = 1/μ
                      </div>
                      <div>
                        <strong>Relaxation Length:</strong> Same as mean free path
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="equations" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Fundamental Equations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="rounded-lg bg-blue-50 p-4">
                    <h4 className="font-medium text-blue-900 mb-3">Beer-Lambert Law</h4>
                    <div className="text-center mb-3">
                      <div className="text-2xl font-mono">I = I₀ × e^(-μx)</div>
                    </div>
                    <div className="text-sm space-y-1">
                      <div>
                        <strong>I:</strong> Transmitted intensity
                      </div>
                      <div>
                        <strong>I₀:</strong> Initial intensity
                      </div>
                      <div>
                        <strong>μ:</strong> Linear attenuation coefficient
                      </div>
                      <div>
                        <strong>x:</strong> Material thickness
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-green-50 p-4">
                    <h4 className="font-medium text-green-900 mb-3">Inverse Square Law</h4>
                    <div className="text-center mb-3">
                      <div className="text-2xl font-mono">I = I₀ × (r₀/r)²</div>
                    </div>
                    <div className="text-sm space-y-1">
                      <div>
                        <strong>I:</strong> Intensity at distance r
                      </div>
                      <div>
                        <strong>I₀:</strong> Intensity at reference distance r₀
                      </div>
                      <div>
                        <strong>r:</strong> Distance from source
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-orange-50 p-4">
                    <h4 className="font-medium text-orange-900 mb-3">Combined Attenuation & Distance</h4>
                    <div className="text-center mb-3">
                      <div className="text-2xl font-mono">I = I₀ × e^(-μx) × (r₀/r)²</div>
                    </div>
                    <div className="text-sm">Accounts for both material attenuation and geometric spreading.</div>
                  </div>

                  <div className="rounded-lg bg-purple-50 p-4">
                    <h4 className="font-medium text-purple-900 mb-3">Buildup Factor</h4>
                    <div className="text-center mb-3">
                      <div className="text-2xl font-mono">I = I₀ × B × e^(-μx)</div>
                    </div>
                    <div className="text-sm">
                      <strong>B:</strong> Buildup factor accounts for scattered radiation contribution.
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="applications" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Medical Applications</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="rounded-lg border p-3">
                      <h5 className="font-medium mb-1">Diagnostic Imaging</h5>
                      <p className="text-sm text-gray-600">X-ray radiography, CT scans, mammography</p>
                      <Badge variant="outline" className="mt-1">
                        20-150 keV
                      </Badge>
                    </div>
                    <div className="rounded-lg border p-3">
                      <h5 className="font-medium mb-1">Radiation Therapy</h5>
                      <p className="text-sm text-gray-600">External beam therapy, brachytherapy</p>
                      <Badge variant="outline" className="mt-1">
                        1-25 MeV
                      </Badge>
                    </div>
                    <div className="rounded-lg border p-3">
                      <h5 className="font-medium mb-1">Nuclear Medicine</h5>
                      <p className="text-sm text-gray-600">SPECT, PET imaging with radioisotopes</p>
                      <Badge variant="outline" className="mt-1">
                        100-500 keV
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Industrial Applications</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="rounded-lg border p-3">
                      <h5 className="font-medium mb-1">Non-Destructive Testing</h5>
                      <p className="text-sm text-gray-600">Weld inspection, material defect detection</p>
                      <Badge variant="outline" className="mt-1">
                        100 keV-10 MeV
                      </Badge>
                    </div>
                    <div className="rounded-lg border p-3">
                      <h5 className="font-medium mb-1">Thickness Gauging</h5>
                      <p className="text-sm text-gray-600">Steel, paper, plastic thickness measurement</p>
                      <Badge variant="outline" className="mt-1">
                        10-100 keV
                      </Badge>
                    </div>
                    <div className="rounded-lg border p-3">
                      <h5 className="font-medium mb-1">Security Screening</h5>
                      <p className="text-sm text-gray-600">Airport baggage, cargo container inspection</p>
                      <Badge variant="outline" className="mt-1">
                        100-450 keV
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Radiation Protection</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="rounded-lg border p-3">
                      <h5 className="font-medium mb-1">Personal Protective Equipment</h5>
                      <p className="text-sm text-gray-600">Lead aprons, thyroid shields, glasses</p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <h5 className="font-medium mb-1">Facility Shielding</h5>
                      <p className="text-sm text-gray-600">Room barriers, door shields, window protection</p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <h5 className="font-medium mb-1">Transport Containers</h5>
                      <p className="text-sm text-gray-600">Radioactive material shipping containers</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Research Applications</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="rounded-lg border p-3">
                      <h5 className="font-medium mb-1">Crystallography</h5>
                      <p className="text-sm text-gray-600">X-ray diffraction for crystal structure analysis</p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <h5 className="font-medium mb-1">Spectroscopy</h5>
                      <p className="text-sm text-gray-600">X-ray fluorescence, absorption spectroscopy</p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <h5 className="font-medium mb-1">Synchrotron Research</h5>
                      <p className="text-sm text-gray-600">High-energy physics, materials science</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

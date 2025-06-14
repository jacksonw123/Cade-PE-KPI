"use client"

import { useState } from "react"
import {
  Plus,
  Edit,
  Download,
  Check,
  Users,
  Database,
  FileText,
  Mail,
  Phone,
  Calendar,
  Clock,
  Shield,
  Key,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Mock data for EHR integrations
const ehrProviders = [
  {
    id: "athenahealth",
    name: "athenahealth",
    logo: "/placeholder.svg?height=40&width=120&text=athenahealth",
    description: "Cloud-based EHR and practice management platform",
    status: "available",
    features: ["Patient Data", "Billing", "Scheduling", "Clinical Notes"],
  },
  {
    id: "eclinicalworks",
    name: "eClinicalWorks",
    logo: "/placeholder.svg?height=40&width=120&text=eClinicalWorks",
    description: "Comprehensive EHR and practice management solution",
    status: "available",
    features: ["EMR", "Practice Management", "Patient Portal", "Revenue Cycle"],
  },
  {
    id: "epic",
    name: "Epic MyChart",
    logo: "/placeholder.svg?height=40&width=120&text=Epic",
    description: "Epic community version for smaller practices",
    status: "available",
    features: ["Clinical Documentation", "Orders", "Results", "Messaging"],
  },
  {
    id: "cerner",
    name: "Oracle Cerner",
    logo: "/placeholder.svg?height=40&width=120&text=Cerner",
    description: "Enterprise health information system",
    status: "coming-soon",
    features: ["EHR", "Population Health", "Revenue Cycle", "Analytics"],
  },
]

const connectedIntegrations = [
  {
    id: "int-1",
    platformName: "Project Moscow",
    ehrProvider: "athenahealth",
    offices: 29,
    status: "connected",
    lastSync: "2024-01-15T10:30:00Z",
    dataPoints: ["Patient Volume", "Revenue", "Collections", "Referrals"],
    apiKey: "ak_live_••••••••••••3x7k",
  },
  {
    id: "int-2",
    platformName: "MedGroup Texas",
    ehrProvider: "eclinicalworks",
    offices: 12,
    status: "connected",
    lastSync: "2024-01-15T09:45:00Z",
    dataPoints: ["Patient Volume", "Revenue", "Collections"],
    apiKey: "ecw_prod_••••••••••••8m2n",
  },
  {
    id: "int-3",
    platformName: "Florida Care Network",
    ehrProvider: "manual",
    offices: 8,
    status: "manual-reporting",
    lastSync: "2024-01-14T16:20:00Z",
    dataPoints: ["Revenue", "Collections"],
    template: "Monthly Financial Report",
  },
]

const reportingTemplates = [
  {
    id: "template-1",
    name: "Monthly Financial Report",
    description: "Comprehensive monthly financial and operational metrics",
    frequency: "monthly",
    dueDate: "5th of each month",
    fields: [
      "Total Revenue",
      "Cash Collections",
      "Patient Volume",
      "New Patients",
      "Referrals Received",
      "Operating Expenses",
      "EBITDA",
    ],
    platforms: ["Florida Care Network", "West Coast Clinics"],
    status: "active",
  },
  {
    id: "template-2",
    name: "Weekly Operations Dashboard",
    description: "Key operational metrics for weekly review",
    frequency: "weekly",
    dueDate: "Every Monday",
    fields: ["Patient Volume", "Appointments Scheduled", "No-Shows", "Collections", "Referrals"],
    platforms: ["Northeast Medical Partners"],
    status: "active",
  },
  {
    id: "template-3",
    name: "Quarterly Performance Review",
    description: "Detailed quarterly analysis with benchmarking",
    frequency: "quarterly",
    dueDate: "15th of quarter end month",
    fields: [
      "Revenue Growth",
      "Profit Margins",
      "Patient Satisfaction",
      "Staff Productivity",
      "Market Share",
      "Competitive Analysis",
    ],
    platforms: ["All Platforms"],
    status: "draft",
  },
]

const contactMembers = [
  {
    id: "contact-1",
    name: "Sarah Johnson",
    role: "CFO",
    platform: "Project Moscow",
    email: "sarah.johnson@projectmoscow.com",
    phone: "+1 (555) 123-4567",
    responsibilities: ["Financial Reporting", "EHR Integration"],
    lastContact: "2024-01-14T14:30:00Z",
    status: "active",
  },
  {
    id: "contact-2",
    name: "Michael Chen",
    role: "Practice Administrator",
    platform: "MedGroup Texas",
    email: "m.chen@medgrouptx.com",
    phone: "+1 (555) 234-5678",
    responsibilities: ["Operations Reporting", "Data Quality"],
    lastContact: "2024-01-15T11:15:00Z",
    status: "active",
  },
  {
    id: "contact-3",
    name: "Lisa Rodriguez",
    role: "IT Director",
    platform: "Florida Care Network",
    email: "l.rodriguez@floridacare.net",
    phone: "+1 (555) 345-6789",
    responsibilities: ["Technical Integration", "Data Security"],
    lastContact: "2024-01-13T16:45:00Z",
    status: "active",
  },
  {
    id: "contact-4",
    name: "David Park",
    role: "Operations Manager",
    platform: "Northeast Medical Partners",
    email: "d.park@nemedpartners.com",
    phone: "+1 (555) 456-7890",
    responsibilities: ["Weekly Reporting", "Performance Metrics"],
    lastContact: "2024-01-12T09:20:00Z",
    status: "pending",
  },
]

export default function SettingsSection() {
  const [selectedSettingsTab, setSelectedSettingsTab] = useState("integrations")
  const [isAddingIntegration, setIsAddingIntegration] = useState(false)
  const [isAddingTemplate, setIsAddingTemplate] = useState(false)
  const [isAddingContact, setIsAddingContact] = useState(false)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      connected: { variant: "default" as const, label: "Connected", icon: Check },
      "manual-reporting": { variant: "secondary" as const, label: "Manual", icon: FileText },
      "coming-soon": { variant: "outline" as const, label: "Coming Soon", icon: Clock },
      active: { variant: "default" as const, label: "Active", icon: Check },
      pending: { variant: "secondary" as const, label: "Pending", icon: Clock },
      draft: { variant: "outline" as const, label: "Draft", icon: Edit },
    }

    const config = statusConfig[status] || statusConfig.pending
    const Icon = config.icon

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground tracking-tight">Settings</h2>
          <p className="text-muted-foreground text-lg mt-1">
            Manage EHR integrations, reporting templates, and contact information
          </p>
        </div>
      </div>

      <Tabs value={selectedSettingsTab} onValueChange={setSelectedSettingsTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-muted">
          <TabsTrigger value="integrations" className="data-[state=active]:bg-card">
            <Database className="h-4 w-4 mr-2" />
            EHR Integrations
          </TabsTrigger>
          <TabsTrigger value="templates" className="data-[state=active]:bg-card">
            <FileText className="h-4 w-4 mr-2" />
            Report Templates
          </TabsTrigger>
          <TabsTrigger value="contacts" className="data-[state=active]:bg-card">
            <Users className="h-4 w-4 mr-2" />
            Contacts
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-card">
            <Shield className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
        </TabsList>

        {/* EHR Integrations Tab */}
        <TabsContent value="integrations" className="space-y-6">
          {/* Available EHR Providers */}
          <Card className="cade-card">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Available EHR Providers
              </CardTitle>
              <CardDescription>Connect your medical practice platforms to supported EHR systems</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ehrProviders.map((provider) => (
                  <div
                    key={provider.id}
                    className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={provider.logo || "/placeholder.svg"}
                          alt={provider.name}
                          className="h-8 w-auto object-contain"
                        />
                        <div>
                          <h4 className="font-semibold text-foreground">{provider.name}</h4>
                          {getStatusBadge(provider.status)}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{provider.description}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {provider.features.map((feature) => (
                        <Badge key={feature} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    <Button
                      className="w-full cade-button-primary"
                      disabled={provider.status === "coming-soon"}
                      onClick={() => setIsAddingIntegration(true)}
                    >
                      {provider.status === "coming-soon" ? "Coming Soon" : "Connect"}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Connected Integrations */}
          <Card className="cade-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Connected Integrations
                  </CardTitle>
                  <CardDescription>Manage your active EHR connections and data sync settings</CardDescription>
                </div>
                <Button className="cade-button-primary" onClick={() => setIsAddingIntegration(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Integration
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {connectedIntegrations.map((integration) => (
                  <div
                    key={integration.id}
                    className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-foreground text-lg">{integration.platformName}</h4>
                        <p className="text-muted-foreground">
                          {integration.ehrProvider === "manual" ? "Manual Reporting" : integration.ehrProvider} •{" "}
                          {integration.offices} offices
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(integration.status)}
                        <Button variant="outline" size="sm" className="cade-button-secondary">
                          <Edit className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <Label className="text-xs text-muted-foreground">Last Sync</Label>
                        <p className="text-sm font-medium text-foreground">{formatDate(integration.lastSync)}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Data Points</Label>
                        <p className="text-sm font-medium text-foreground">{integration.dataPoints.length} metrics</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">
                          {integration.apiKey ? "API Key" : "Template"}
                        </Label>
                        <p className="text-sm font-medium text-foreground font-mono">
                          {integration.apiKey || integration.template}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {integration.dataPoints.map((point) => (
                        <Badge key={point} variant="secondary" className="text-xs">
                          {point}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Switch defaultChecked />
                        <Label className="text-sm">Auto-sync enabled</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="cade-button-secondary">
                          Test Connection
                        </Button>
                        <Button variant="outline" size="sm" className="cade-button-secondary">
                          Sync Now
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Report Templates Tab */}
        <TabsContent value="templates" className="space-y-6">
          <Card className="cade-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Reporting Templates
                  </CardTitle>
                  <CardDescription>
                    Manage data collection templates for platforms without direct EHR integration
                  </CardDescription>
                </div>
                <Button className="cade-button-primary" onClick={() => setIsAddingTemplate(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Template
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportingTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="border border-border rounded-lg p-6 hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-foreground text-lg">{template.name}</h4>
                        <p className="text-muted-foreground">{template.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(template.status)}
                        <Button variant="outline" size="sm" className="cade-button-secondary">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm" className="cade-button-secondary">
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <Label className="text-xs text-muted-foreground">Frequency</Label>
                        <p className="text-sm font-medium text-foreground capitalize">{template.frequency}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Due Date</Label>
                        <p className="text-sm font-medium text-foreground">{template.dueDate}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Platforms</Label>
                        <p className="text-sm font-medium text-foreground">{template.platforms.length} assigned</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <Label className="text-xs text-muted-foreground">
                        Required Fields ({template.fields.length})
                      </Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {template.fields.map((field) => (
                          <Badge key={field} variant="outline" className="text-xs">
                            {field}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {template.platforms.map((platform) => (
                          <Badge key={platform} variant="secondary" className="text-xs">
                            {platform}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="cade-button-secondary">
                          Preview
                        </Button>
                        <Button variant="outline" size="sm" className="cade-button-secondary">
                          Send Reminder
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contacts Tab */}
        <TabsContent value="contacts" className="space-y-6">
          <Card className="cade-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Contact Directory
                  </CardTitle>
                  <CardDescription>
                    Manage contacts responsible for data reporting and EHR integration at each platform
                  </CardDescription>
                </div>
                <Button className="cade-button-primary" onClick={() => setIsAddingContact(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Contact
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contactMembers.map((contact) => (
                  <div
                    key={contact.id}
                    className="border border-border rounded-lg p-6 hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                          <Users className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground text-lg">{contact.name}</h4>
                          <p className="text-muted-foreground">{contact.role}</p>
                          <p className="text-sm text-muted-foreground">{contact.platform}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(contact.status)}
                        <Button variant="outline" size="sm" className="cade-button-secondary">
                          <Edit className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-foreground">{contact.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-foreground">{contact.phone}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <Label className="text-xs text-muted-foreground">Responsibilities</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {contact.responsibilities.map((responsibility) => (
                          <Badge key={responsibility} variant="outline" className="text-xs">
                            {responsibility}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        Last contact: {formatDate(contact.lastContact)}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="cade-button-secondary">
                          <Mail className="h-3 w-3 mr-1" />
                          Email
                        </Button>
                        <Button variant="outline" size="sm" className="cade-button-secondary">
                          <Phone className="h-3 w-3 mr-1" />
                          Call
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card className="cade-card">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security & Compliance
              </CardTitle>
              <CardDescription>Manage data security settings and compliance requirements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium text-foreground">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Require 2FA for all users accessing sensitive data</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium text-foreground">Data Encryption</Label>
                    <p className="text-sm text-muted-foreground">Encrypt all data in transit and at rest</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium text-foreground">Audit Logging</Label>
                    <p className="text-sm text-muted-foreground">Log all data access and modifications</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium text-foreground">HIPAA Compliance</Label>
                    <p className="text-sm text-muted-foreground">Enable HIPAA-compliant data handling</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">API Keys & Access</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Key className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-foreground">Production API Key</p>
                        <p className="text-sm text-muted-foreground font-mono">pk_live_••••••••••••••••••••••••7x9k</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="cade-button-secondary">
                      Regenerate
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Key className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-foreground">Webhook Secret</p>
                        <p className="text-sm text-muted-foreground font-mono">whsec_••••••••••••••••••••••••8m3n</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="cade-button-secondary">
                      Regenerate
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Integration Dialog */}
      <Dialog open={isAddingIntegration} onOpenChange={setIsAddingIntegration}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add EHR Integration</DialogTitle>
            <DialogDescription>Connect a new platform to an EHR system or set up manual reporting</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="platform">Platform</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">Add New Platform</SelectItem>
                    <SelectItem value="existing1">Existing Platform 1</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="ehr">EHR Provider</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select EHR" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="athenahealth">athenahealth</SelectItem>
                    <SelectItem value="eclinicalworks">eClinicalWorks</SelectItem>
                    <SelectItem value="epic">Epic MyChart</SelectItem>
                    <SelectItem value="manual">Manual Reporting</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="api-key">API Key / Credentials</Label>
              <Input id="api-key" placeholder="Enter API key or connection string" />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddingIntegration(false)}>
                Cancel
              </Button>
              <Button className="cade-button-primary">Test & Connect</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

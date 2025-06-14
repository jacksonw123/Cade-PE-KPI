"use client"

import { useState } from "react"
import {
  Download,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Activity,
  UserPlus,
  Building2,
  MapPin,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  BarChart,
  Bar,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts"
import SettingsSection from "@/components/settings-section" // Import SettingsSection component

// Mock data for demonstration
const platformData = [
  {
    id: "platform-moscow",
    name: "Project Moscow",
    offices: 29,
    totalRevenue: 42857143, // Calculated from 15M EBITDA at 35% margin
    monthlyGrowth: 18.7,
    patientVolume: 35600,
    cashCollections: 39500000,
    referrals: 2890,
    profitMargin: 35.0,
    ebitda: 15000000,
    status: "healthy",
  },
  {
    id: "platform-1",
    name: "MedGroup Texas",
    offices: 12,
    totalRevenue: 2450000,
    monthlyGrowth: 8.5,
    patientVolume: 15420,
    cashCollections: 2200000,
    referrals: 1250,
    profitMargin: 18.5,
    ebitda: 453250,
    status: "healthy",
  },
  {
    id: "platform-2",
    name: "Florida Care Network",
    offices: 8,
    totalRevenue: 1850000,
    monthlyGrowth: -2.1,
    patientVolume: 11200,
    cashCollections: 1650000,
    referrals: 890,
    profitMargin: 15.2,
    ebitda: 281200,
    status: "warning",
  },
  {
    id: "platform-3",
    name: "Northeast Medical Partners",
    offices: 15,
    totalRevenue: 3200000,
    monthlyGrowth: 12.3,
    patientVolume: 22100,
    cashCollections: 2950000,
    referrals: 1680,
    profitMargin: 22.1,
    ebitda: 707200,
    status: "healthy",
  },
  {
    id: "platform-4",
    name: "West Coast Clinics",
    offices: 6,
    totalRevenue: 1200000,
    monthlyGrowth: 5.7,
    patientVolume: 8900,
    cashCollections: 1100000,
    referrals: 520,
    profitMargin: 16.8,
    ebitda: 201600,
    status: "healthy",
  },
]

const officesByPlatform = {
  "platform-moscow": [
    {
      office: "Moscow Central",
      category: "Oral Surgery",
      revenue: 2100000,
      growth: 22.5,
      patients: 1850,
      collections: 1950000,
      margin: 38.2,
      ebitda: 802200,
    },
    {
      office: "Moscow North",
      category: "Pediatric Dental",
      revenue: 1950000,
      growth: 18.3,
      patients: 1720,
      collections: 1800000,
      margin: 36.5,
      ebitda: 711750,
    },
    {
      office: "Moscow South",
      category: "Orthodontics",
      revenue: 1800000,
      growth: 15.8,
      patients: 1580,
      collections: 1650000,
      margin: 34.1,
      ebitda: 613800,
    },
    {
      office: "Moscow East",
      category: "Oral Surgery",
      revenue: 1750000,
      growth: 20.1,
      patients: 1540,
      collections: 1620000,
      margin: 35.8,
      ebitda: 626500,
    },
    {
      office: "Moscow West",
      category: "Pediatric Dental",
      revenue: 1680000,
      growth: 16.9,
      patients: 1480,
      collections: 1550000,
      margin: 33.9,
      ebitda: 569520,
    },
    {
      office: "Podolsk Main",
      category: "Orthodontics",
      revenue: 1520000,
      growth: 14.2,
      patients: 1340,
      collections: 1400000,
      margin: 32.5,
      ebitda: 494000,
    },
    {
      office: "Khimki Center",
      category: "Oral Surgery",
      revenue: 1450000,
      growth: 19.6,
      patients: 1280,
      collections: 1350000,
      margin: 34.8,
      ebitda: 504600,
    },
    {
      office: "Mytishchi",
      category: "Pediatric Dental",
      revenue: 1380000,
      growth: 12.8,
      patients: 1220,
      collections: 1280000,
      margin: 31.2,
      ebitda: 430560,
    },
    {
      office: "Balashikha",
      category: "Orthodontics",
      revenue: 1320000,
      growth: 17.4,
      patients: 1160,
      collections: 1220000,
      margin: 33.6,
      ebitda: 443520,
    },
    {
      office: "Lyubertsy",
      category: "Oral Surgery",
      revenue: 1280000,
      growth: 13.5,
      patients: 1130,
      collections: 1180000,
      margin: 32.1,
      ebitda: 410880,
    },
    {
      office: "Elektrostal",
      category: "Pediatric Dental",
      revenue: 1180000,
      growth: 11.9,
      patients: 1040,
      collections: 1090000,
      margin: 30.8,
      ebitda: 363440,
    },
    {
      office: "Kolomna",
      category: "Orthodontics",
      revenue: 1150000,
      growth: 16.2,
      patients: 1010,
      collections: 1060000,
      margin: 33.2,
      ebitda: 381800,
    },
    {
      office: "Serpukhov",
      category: "Oral Surgery",
      revenue: 1100000,
      growth: 9.8,
      patients: 970,
      collections: 1020000,
      margin: 29.5,
      ebitda: 324500,
    },
    {
      office: "Orekhovo-Zuevo",
      category: "Pediatric Dental",
      revenue: 1080000,
      growth: 14.7,
      patients: 950,
      collections: 1000000,
      margin: 32.8,
      ebitda: 354240,
    },
    {
      office: "Noginsk",
      category: "Orthodontics",
      revenue: 1020000,
      growth: 8.3,
      patients: 900,
      collections: 940000,
      margin: 28.9,
      ebitda: 294780,
    },
    {
      office: "Ramenskoye",
      category: "Oral Surgery",
      revenue: 980000,
      growth: 12.1,
      patients: 860,
      collections: 910000,
      margin: 31.5,
      ebitda: 308700,
    },
    {
      office: "Domodedovo",
      category: "Pediatric Dental",
      revenue: 950000,
      growth: 15.3,
      patients: 840,
      collections: 880000,
      margin: 33.1,
      ebitda: 314450,
    },
    {
      office: "Pushkino",
      category: "Orthodontics",
      revenue: 920000,
      growth: 10.6,
      patients: 810,
      collections: 850000,
      margin: 30.2,
      ebitda: 277840,
    },
    {
      office: "Shchyolkovo",
      category: "Oral Surgery",
      revenue: 890000,
      growth: 13.9,
      patients: 780,
      collections: 820000,
      margin: 32.4,
      ebitda: 288360,
    },
    {
      office: "Zhukovsky",
      category: "Pediatric Dental",
      revenue: 860000,
      growth: 7.2,
      patients: 760,
      collections: 790000,
      margin: 28.1,
      ebitda: 241660,
    },
    {
      office: "Fryazino",
      category: "Orthodontics",
      revenue: 820000,
      growth: 11.4,
      patients: 720,
      collections: 760000,
      margin: 30.8,
      ebitda: 252560,
    },
    {
      office: "Bronnitsy",
      category: "Oral Surgery",
      revenue: 780000,
      growth: 9.1,
      patients: 690,
      collections: 720000,
      margin: 29.3,
      ebitda: 228540,
    },
    {
      office: "Voskresensk",
      category: "Pediatric Dental",
      revenue: 750000,
      growth: 14.8,
      patients: 660,
      collections: 690000,
      margin: 32.6,
      ebitda: 244500,
    },
    {
      office: "Egoryevsk",
      category: "Orthodontics",
      revenue: 720000,
      growth: 6.9,
      patients: 630,
      collections: 660000,
      margin: 27.8,
      ebitda: 200160,
    },
    {
      office: "Pavlovsky Posad",
      category: "Oral Surgery",
      revenue: 690000,
      growth: 12.7,
      patients: 610,
      collections: 640000,
      margin: 31.9,
      ebitda: 220110,
    },
    {
      office: "Losino-Petrovsky",
      category: "Pediatric Dental",
      revenue: 650000,
      growth: 8.5,
      patients: 570,
      collections: 600000,
      margin: 29.7,
      ebitda: 193050,
    },
    {
      office: "Krasnozavodsk",
      category: "Orthodontics",
      revenue: 620000,
      growth: 10.3,
      patients: 540,
      collections: 570000,
      margin: 30.5,
      ebitda: 189100,
    },
    {
      office: "Lukhovitsy",
      category: "Oral Surgery",
      revenue: 580000,
      growth: 7.8,
      patients: 510,
      collections: 530000,
      margin: 28.4,
      ebitda: 164720,
    },
    {
      office: "Zaraysk",
      category: "Pediatric Dental",
      revenue: 520000,
      growth: 13.2,
      patients: 460,
      collections: 480000,
      margin: 32.1,
      ebitda: 166920,
    },
  ],
  "platform-1": [
    {
      office: "Austin Main",
      revenue: 450000,
      growth: 12.5,
      patients: 2800,
      collections: 420000,
      margin: 22.1,
      ebitda: 99450,
    },
    {
      office: "Dallas North",
      revenue: 380000,
      growth: 8.2,
      patients: 2200,
      collections: 350000,
      margin: 19.5,
      ebitda: 74100,
    },
    {
      office: "Houston West",
      revenue: 320000,
      growth: -5.1,
      patients: 1900,
      collections: 280000,
      margin: 15.2,
      ebitda: 48640,
    },
    {
      office: "San Antonio",
      revenue: 290000,
      growth: 15.8,
      patients: 1800,
      collections: 270000,
      margin: 20.8,
      ebitda: 60320,
    },
    {
      office: "Fort Worth",
      revenue: 280000,
      growth: 6.3,
      patients: 1750,
      collections: 260000,
      margin: 18.9,
      ebitda: 52920,
    },
    {
      office: "El Paso",
      revenue: 250000,
      growth: 9.7,
      patients: 1600,
      collections: 230000,
      margin: 17.5,
      ebitda: 43750,
    },
    {
      office: "Arlington",
      revenue: 220000,
      growth: 4.1,
      patients: 1400,
      collections: 200000,
      margin: 16.8,
      ebitda: 36960,
    },
    {
      office: "Plano",
      revenue: 200000,
      growth: 11.2,
      patients: 1300,
      collections: 185000,
      margin: 19.2,
      ebitda: 38400,
    },
    {
      office: "Garland",
      revenue: 180000,
      growth: 2.8,
      patients: 1150,
      collections: 165000,
      margin: 15.9,
      ebitda: 28620,
    },
    {
      office: "Irving",
      revenue: 160000,
      growth: 7.5,
      patients: 1050,
      collections: 148000,
      margin: 17.3,
      ebitda: 27680,
    },
    {
      office: "Amarillo",
      revenue: 140000,
      growth: 5.9,
      patients: 950,
      collections: 128000,
      margin: 16.1,
      ebitda: 22540,
    },
    {
      office: "Beaumont",
      revenue: 120000,
      growth: 3.4,
      patients: 850,
      collections: 110000,
      margin: 14.8,
      ebitda: 17760,
    },
  ],
  // Add other platforms' offices here...
}

const referralData = [
  { source: "Primary Care", value: 45, count: 1890 },
  { source: "Specialists", value: 25, count: 1050 },
  { source: "Emergency", value: 15, count: 630 },
  { source: "Direct", value: 10, count: 420 },
  { source: "Other", value: 5, count: 210 },
]

const CHART_COLORS = ["#8B5A3C", "#A67C52", "#C4956C", "#D4AF8C", "#E8C5A0"]

const revenueData = [
  { month: "Jan", revenue: 10000000, collections: 8000000, target: 12000000 },
  { month: "Feb", revenue: 11000000, collections: 9000000, target: 13000000 },
  { month: "Mar", revenue: 12000000, collections: 10000000, target: 14000000 },
  { month: "Apr", revenue: 13000000, collections: 11000000, target: 15000000 },
  { month: "May", revenue: 14000000, collections: 12000000, target: 16000000 },
  { month: "Jun", revenue: 15000000, collections: 13000000, target: 17000000 },
]

export default function Dashboard() {
  const [selectedPlatform, setSelectedPlatform] = useState("all")
  const [selectedTimeframe, setSelectedTimeframe] = useState("6m")
  const [selectedView, setSelectedView] = useState("overview")
  const [selectedPlatformForOffices, setSelectedPlatformForOffices] = useState<string | null>(null)

  const totalRevenue = platformData.reduce((sum, platform) => sum + platform.totalRevenue, 0)
  const totalPatients = platformData.reduce((sum, platform) => sum + platform.patientVolume, 0)
  const totalCollections = platformData.reduce((sum, platform) => sum + platform.cashCollections, 0)
  const totalReferrals = platformData.reduce((sum, platform) => sum + platform.referrals, 0)
  const avgProfitMargin = platformData.reduce((sum, platform) => sum + platform.profitMargin, 0) / platformData.length

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("en-US").format(value)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="cade-header">
        <div className="container mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground tracking-tight">Portfolio KPI Dashboard</h1>
              <p className="text-muted-foreground mt-1 text-lg">
                Real-time performance metrics across medical practice platforms
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                <SelectTrigger className="w-48 cade-button-secondary">
                  <SelectValue placeholder="Select Platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Platforms</SelectItem>
                  {platformData.map((platform) => (
                    <SelectItem key={platform.id} value={platform.id}>
                      {platform.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <SelectTrigger className="w-32 cade-button-secondary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1m">1 Month</SelectItem>
                  <SelectItem value="3m">3 Months</SelectItem>
                  <SelectItem value="6m">6 Months</SelectItem>
                  <SelectItem value="1y">1 Year</SelectItem>
                </SelectContent>
              </Select>
              <Button className="cade-button-primary">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-8 py-8">
        <Tabs value={selectedView} onValueChange={setSelectedView} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-muted">
            <TabsTrigger value="overview" className="data-[state=active]:bg-card">
              Portfolio Overview
            </TabsTrigger>
            <TabsTrigger value="platforms" className="data-[state=active]:bg-card">
              Platform Analysis
            </TabsTrigger>
            <TabsTrigger value="benchmarks" className="data-[state=active]:bg-card">
              Benchmarking
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-card">
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* KPI Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <Card className="cade-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{formatCurrency(totalRevenue)}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="cade-metric-positive flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +8.2% from last month
                    </span>
                  </p>
                </CardContent>
              </Card>

              <Card className="cade-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Patient Volume</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{formatNumber(totalPatients)}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="cade-metric-positive flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +12.5% from last month
                    </span>
                  </p>
                </CardContent>
              </Card>

              <Card className="cade-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Cash Collections</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{formatCurrency(totalCollections)}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="cade-metric-positive flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +6.8% from last month
                    </span>
                  </p>
                </CardContent>
              </Card>

              <Card className="cade-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Referrals</CardTitle>
                  <UserPlus className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{formatNumber(totalReferrals)}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="cade-metric-positive flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +15.2% from last month
                    </span>
                  </p>
                </CardContent>
              </Card>

              <Card className="cade-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Avg Profit Margin</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{avgProfitMargin.toFixed(1)}%</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="cade-metric-positive flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +2.1% from last month
                    </span>
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="cade-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Revenue vs Collections Trend</CardTitle>
                  <CardDescription>Monthly performance over the last 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      revenue: {
                        label: "Revenue",
                        color: "hsl(var(--chart-1))",
                      },
                      collections: {
                        label: "Collections",
                        color: "hsl(var(--chart-2))",
                      },
                      target: {
                        label: "Target",
                        color: "hsl(var(--chart-3))",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                        <YAxis
                          tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                          stroke="hsl(var(--muted-foreground))"
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area
                          type="monotone"
                          dataKey="revenue"
                          stackId="1"
                          stroke="var(--color-revenue)"
                          fill="var(--color-revenue)"
                          fillOpacity={0.6}
                        />
                        <Area
                          type="monotone"
                          dataKey="collections"
                          stackId="2"
                          stroke="var(--color-collections)"
                          fill="var(--color-collections)"
                          fillOpacity={0.6}
                        />
                        <Line type="monotone" dataKey="target" stroke="var(--color-target)" strokeDasharray="5 5" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card className="cade-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Referral Sources</CardTitle>
                  <CardDescription>Distribution of patient referrals by source</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      value: {
                        label: "Percentage",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={referralData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {referralData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="platforms" className="space-y-6">
            {selectedPlatformForOffices ? (
              // Office view for selected platform
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedPlatformForOffices(null)}
                    className="cade-button-secondary"
                  >
                    ← Back to Platforms
                  </Button>
                  <div>
                    <h2 className="text-2xl font-semibold text-foreground">
                      {platformData.find((p) => p.id === selectedPlatformForOffices)?.name} - Office Details
                    </h2>
                    <p className="text-muted-foreground text-lg">
                      {officesByPlatform[selectedPlatformForOffices]?.length || 0} office locations
                    </p>
                  </div>
                </div>

                <Card className="cade-card">
                  <CardHeader>
                    <CardTitle className="text-foreground">Office Performance</CardTitle>
                    <CardDescription>Detailed metrics for individual office locations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {officesByPlatform[selectedPlatformForOffices]?.map((office, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-6 border border-border rounded-lg hover:bg-muted/30 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <MapPin className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="font-semibold text-foreground text-lg">{office.office}</p>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs">
                                  {office.category}
                                </Badge>
                                <p className="text-muted-foreground">{formatNumber(office.patients)} patients</p>
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-5 gap-8 text-right">
                            <div>
                              <p className="text-sm text-muted-foreground">Revenue</p>
                              <p className="font-semibold text-foreground">{formatCurrency(office.revenue)}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Growth</p>
                              <p
                                className={`font-semibold flex items-center justify-end ${office.growth >= 0 ? "cade-metric-positive" : "cade-metric-negative"}`}
                              >
                                {office.growth >= 0 ? (
                                  <TrendingUp className="h-3 w-3 mr-1" />
                                ) : (
                                  <TrendingDown className="h-3 w-3 mr-1" />
                                )}
                                {office.growth.toFixed(1)}%
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Collections</p>
                              <p className="font-semibold text-foreground">{formatCurrency(office.collections)}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Margin</p>
                              <p className="font-semibold text-foreground">{office.margin.toFixed(1)}%</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">EBITDA</p>
                              <p className="font-semibold text-foreground">{formatCurrency(office.ebitda)}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              // Platform overview
              <div className="grid gap-6">
                {platformData.map((platform) => (
                  <Card key={platform.id} className="cade-card">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Building2 className="h-6 w-6 text-muted-foreground" />
                          <div>
                            <CardTitle className="text-foreground text-xl">{platform.name}</CardTitle>
                            <CardDescription className="text-lg">{platform.offices} offices</CardDescription>
                          </div>
                        </div>
                        <Badge variant={platform.status === "healthy" ? "default" : "destructive"} className="text-sm">
                          {platform.status === "healthy" ? "Healthy" : "Needs Attention"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-7 gap-6">
                        <div>
                          <p className="text-sm text-muted-foreground">Revenue</p>
                          <p className="text-lg font-semibold text-foreground">
                            {formatCurrency(platform.totalRevenue)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">EBITDA</p>
                          <p className="text-lg font-semibold text-foreground">{formatCurrency(platform.ebitda)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Growth</p>
                          <p
                            className={`text-lg font-semibold flex items-center ${platform.monthlyGrowth >= 0 ? "cade-metric-positive" : "cade-metric-negative"}`}
                          >
                            {platform.monthlyGrowth >= 0 ? (
                              <TrendingUp className="h-4 w-4 mr-1" />
                            ) : (
                              <TrendingDown className="h-4 w-4 mr-1" />
                            )}
                            {platform.monthlyGrowth.toFixed(1)}%
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Patients</p>
                          <p className="text-lg font-semibold text-foreground">
                            {formatNumber(platform.patientVolume)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Collections</p>
                          <p className="text-lg font-semibold text-foreground">
                            {formatCurrency(platform.cashCollections)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Referrals</p>
                          <p className="text-lg font-semibold text-foreground">{formatNumber(platform.referrals)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Profit Margin</p>
                          <p className="text-lg font-semibold text-foreground">{platform.profitMargin.toFixed(1)}%</p>
                        </div>
                      </div>
                      <Separator className="my-6" />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-muted-foreground">Collection Rate:</span>
                          <Progress value={(platform.cashCollections / platform.totalRevenue) * 100} className="w-32" />
                          <span className="text-sm font-medium text-foreground">
                            {((platform.cashCollections / platform.totalRevenue) * 100).toFixed(1)}%
                          </span>
                        </div>
                        <Button
                          variant="outline"
                          onClick={() => setSelectedPlatformForOffices(platform.id)}
                          className="cade-button-secondary"
                        >
                          View {platform.offices} Offices
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="benchmarks" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="cade-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Revenue Benchmarking</CardTitle>
                  <CardDescription>Platform comparison by monthly revenue</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      revenue: {
                        label: "Revenue",
                        color: "hsl(var(--chart-1))",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={platformData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis
                          dataKey="name"
                          angle={-45}
                          textAnchor="end"
                          height={80}
                          stroke="hsl(var(--muted-foreground))"
                        />
                        <YAxis
                          tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                          stroke="hsl(var(--muted-foreground))"
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="totalRevenue" fill="var(--color-revenue)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card className="cade-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Profit Margin Comparison</CardTitle>
                  <CardDescription>Platform profitability benchmarks</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      margin: {
                        label: "Profit Margin",
                        color: "hsl(var(--chart-2))",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={platformData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis
                          dataKey="name"
                          angle={-45}
                          textAnchor="end"
                          height={80}
                          stroke="hsl(var(--muted-foreground))"
                        />
                        <YAxis tickFormatter={(value) => `${value}%`} stroke="hsl(var(--muted-foreground))" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="profitMargin" fill="var(--color-margin)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            <Card className="cade-card">
              <CardHeader>
                <CardTitle className="text-foreground">Performance Metrics Comparison</CardTitle>
                <CardDescription>Key performance indicators across all platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-6 gap-4 text-sm font-medium text-muted-foreground border-b border-border pb-3">
                    <div>Platform</div>
                    <div>Revenue</div>
                    <div>Growth</div>
                    <div>Patients</div>
                    <div>Collections</div>
                    <div>Margin</div>
                  </div>
                  {platformData.map((platform) => (
                    <div
                      key={platform.id}
                      className="grid grid-cols-6 gap-4 items-center py-3 border-b border-border last:border-b-0"
                    >
                      <div className="font-semibold text-foreground">{platform.name}</div>
                      <div className="text-foreground">{formatCurrency(platform.totalRevenue)}</div>
                      <div
                        className={`flex items-center ${platform.monthlyGrowth >= 0 ? "cade-metric-positive" : "cade-metric-negative"}`}
                      >
                        {platform.monthlyGrowth >= 0 ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-1" />
                        )}
                        {platform.monthlyGrowth.toFixed(1)}%
                      </div>
                      <div className="text-foreground">{formatNumber(platform.patientVolume)}</div>
                      <div className="text-foreground">{formatCurrency(platform.cashCollections)}</div>
                      <div className="text-foreground">{platform.profitMargin.toFixed(1)}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="settings" className="space-y-8">
            <SettingsSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

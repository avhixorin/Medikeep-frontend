import React from "react"
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
// import { AreaChart, Area, CartesianGrid, XAxis, Tooltip as ChartTooltip } from 'recharts'
// import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltipContent } from '@/components/ui/chart'

// const chartConfig = {
//     visitors: {
//         label: "Activity",
//     },
//     stepCount: {
//         label: "Step Count",
//         color: "hsl(var(--chart-1))",
//     },
//     heartRate: {
//         label: "Heart Rate",
//         color: "hsl(var(--chart-2))",
//     },
// } 
// satisfies ChartConfig

export function ActivityChart() {
    const [timeRange, setTimeRange] = React.useState("90d")

    // const generateRandomData = (numDays: number) => {
    //     const activityData = [];
    //     const today = new Date();
        
    //     for (let i = 0; i < numDays; i++) {
    //       const date = new Date();
    //       date.setDate(today.getDate() - i);
    //       const stepCount = Math.floor(Math.random() * (10000 - 4000 + 1)) + 4000;
      
    //       const heartRate = Math.floor(Math.random() * (80 - 60 + 1)) + 60;
      
    //       activityData.push({
    //         date: date.toISOString().split('T')[0],
    //         stepCount,
    //         heartRate,
    //       });
    //     }
        
    //     return activityData;
    //   };
      
    //   const generatedData = generateRandomData(90);

    //   const filteredData = generatedData.filter((item) => {
    //     const date = new Date(item.date)
    //     const referenceDate = new Date("2024-06-30")
    //     let daysToSubtract = 90
    //     if (timeRange === "30d") {
    //         daysToSubtract = 30
    //     } else if (timeRange === "7d") {
    //         daysToSubtract = 7
    //     }
    //     const startDate = new Date(referenceDate)
    //     startDate.setDate(startDate.getDate() - daysToSubtract)
    //     return date >= startDate
    // })
      
    return (
        <Card>
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-2 sm:flex-row">
                <div className="grid flex-1 gap-1 text-center sm:text-left">
                    <CardTitle>Activity Chart</CardTitle>
                    
                </div>
                <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger
                        className="w-[160px] rounded-lg sm:ml-auto"
                        aria-label="Select a value"
                    >
                        <SelectValue placeholder="Last 3 months" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="90d" className="rounded-lg">
                            Last 3 months
                        </SelectItem>
                        <SelectItem value="30d" className="rounded-lg">
                            Last 30 days
                        </SelectItem>
                        <SelectItem value="7d" className="rounded-lg">
                            Last 7 days
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="mt-4">
                {/* <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <AreaChart data={filteredData}>
                        <defs>
                            <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="rgba(255, 80, 80, 0.8)" 
                                    stopOpacity={0.9}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="rgba(255, 80, 80, 0.1)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="rgba(80, 120, 255, 0.8)" 
                                    stopOpacity={0.9}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="rgba(80, 120, 255, 0.1)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} stroke="none" />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                })
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                        })
                                    }}
                                    indicator="dot"
                                />
                            }
                        />
                        <Area
                            dataKey="heartRate"
                            type="natural"
                            fill="url(#fillMobile)"
                            stroke="rgba(80, 120, 255, 1)"  // Dark blue stroke
                            stackId="a"
                        />
                        <Area
                            dataKey="stepCount"
                            type="natural"
                            fill="url(#fillDesktop)"
                            stroke="rgba(255, 80, 80, 1)" 
                            stackId="a"
                        />
                        <ChartLegend content={<ChartLegendContent payload={undefined} />} />
                    </AreaChart>
                </ChartContainer> */}
            </CardContent>
        </Card>
    )
}

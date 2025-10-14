import React, { useState, useEffect } from 'react';
import DesktopLayout from '@/components/layout/DesktopLayout';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, TrendingUp, Activity, Download } from 'lucide-react';
import { analyticsService } from '@/services/analyticsService';

export default function AIReports() {
  const [aiReport, setAiReport] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {
    setIsLoading(true);
    try {
      const report = await analyticsService.getAIUsageReport('month');
      setAiReport(report);
    } catch (error) {
      console.error('Error loading AI report:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <DesktopLayout role="admin" userName="Admin User" breadcrumbs={[{ label: 'AI Reports & Usage' }]}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Brain className="w-12 h-12 text-indigo-600 animate-pulse mx-auto mb-4" />
            <p className="text-gray-600">Loading AI reports...</p>
          </div>
        </div>
      </DesktopLayout>
    );
  }

  if (!aiReport) {
    return (
      <DesktopLayout role="admin" userName="Admin User" breadcrumbs={[{ label: 'AI Reports & Usage' }]}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-gray-600">No data available</p>
            <Button onClick={loadReport} className="mt-4">Retry</Button>
          </div>
        </div>
      </DesktopLayout>
    );
  }

  return (
    <DesktopLayout role="admin" userName="Admin User" breadcrumbs={[{ label: 'AI Reports & Usage' }]}>
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">AI Reports & Usage Heatmaps</h1>
            <p className="text-gray-600 mt-1">AI feature analytics and insights</p>
          </div>
          <Button variant="outline"><Download className="w-4 h-4 mr-2" />Export Report</Button>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-6">
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">AI Symptom Checker</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">
                    {aiReport.features.symptomChecker.totalUses}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {aiReport.features.symptomChecker.averageConfidence}% avg confidence
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">AI Triage Reviews</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">
                    {aiReport.features.aiTriage.reviewedCases}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {aiReport.features.aiTriage.averageAccuracy}% accuracy
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Time Saved</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">
                    {aiReport.savings.timesSaved}h
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    ${(aiReport.savings.costSavings / 1000).toFixed(0)}K saved
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-lg mb-6">
          <CardHeader className="border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900">AI Insights</h3>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {aiReport.insights.map((insight: string, idx: number) => (
                <div key={idx} className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                  <p className="text-sm text-indigo-900">{insight}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-6">
          <Card className="border-0 shadow-lg">
            <CardHeader className="border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">Top Conditions Diagnosed</h3>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                {aiReport.features.symptomChecker.topConditions.map((condition: any) => (
                  <div key={condition.condition} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{condition.condition}</span>
                    <Badge variant="secondary">{condition.count}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">Voice Commands</h3>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                {aiReport.features.voiceAssistant.topCommands.map((cmd: any) => (
                  <div key={cmd.command} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{cmd.command}</span>
                    <Badge variant="secondary">{cmd.count}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DesktopLayout>
  );
}


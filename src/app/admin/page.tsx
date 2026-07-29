// ─── Admin Panel ───────────────────────────────────────────────────────
'use client';

import { motion } from 'framer-motion';
import { MainLayout } from '@/components/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  BarChart3,
  Users,
  Film,
  Activity,
  TrendingUp,
  Settings,
  Shield,
  Terminal,
  RefreshCw,
} from 'lucide-react';

const stats = [
  { label: 'Total Users', value: '--', icon: Users, change: '+0%', color: 'text-blue-400' },
  { label: 'Total Content', value: '--', icon: Film, change: '+0%', color: 'text-green-400' },
  { label: 'Active Streams', value: '--', icon: Activity, change: '+0%', color: 'text-jagflix-400' },
  { label: 'API Calls', value: '--', icon: BarChart3, change: '+0%', color: 'text-purple-400' },
];

export default function AdminPage() {
  return (
    <MainLayout>
      <div className="pt-24 pb-16 min-h-screen">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-jagflix-500/10 border border-jagflix-500/20">
                <Shield className="w-6 h-6 text-jagflix-400" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-white">Admin Panel</h1>
                <p className="text-zinc-500 mt-1">Dashboard & Analytics</p>
              </div>
            </div>
            <Button variant="outline" leftIcon={<RefreshCw className="w-4 h-4" />}>
              Refresh
            </Button>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card>
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm text-zinc-500">{stat.label}</p>
                          <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                          <p className={`text-xs mt-1 ${stat.color}`}>{stat.change}</p>
                        </div>
                        <Icon className={`w-5 h-5 ${stat.color}`} />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Tabs */}
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="logs">Logs</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center py-12 text-zinc-500">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 mx-auto mb-3 text-zinc-700" />
                      <p>Analytics dashboard will display here once data is available.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content">
              <Card>
                <CardHeader>
                  <CardTitle>Content Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center py-12 text-zinc-500">
                    <div className="text-center">
                      <Film className="w-12 h-12 mx-auto mb-3 text-zinc-700" />
                      <p>Content management tools will be available here.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center py-12 text-zinc-500">
                    <div className="text-center">
                      <Users className="w-12 h-12 mx-auto mb-3 text-zinc-700" />
                      <p>User management interface will display here.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="logs">
              <Card>
                <CardHeader>
                  <CardTitle>System Logs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center py-12 text-zinc-500">
                    <div className="text-center">
                      <Terminal className="w-12 h-12 mx-auto mb-3 text-zinc-700" />
                      <p>System logs and API monitoring will display here.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
}

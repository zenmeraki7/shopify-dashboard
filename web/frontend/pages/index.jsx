import React, { useState } from 'react';
import {
  AppProvider,
  Page,
  Layout,
  Card,
  ResourceList,
  Avatar,
  TextStyle,
  Button,
  ButtonGroup,
  Tabs,
  Badge,
  Banner,
  ProgressBar,
  Heading,
} from '@shopify/polaris';
import { LineChart, AreaChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend } from 'recharts';

const Dashboard = () => {
  const [selected, setSelected] = useState(0);

  // Color palette
  const colors = {
    primary: '#5C6AC4',
    secondary: '#47C1BF',
    success: '#50B83C',
    warning: '#EEC200',
    critical: '#DE3618',
    highlight: '#9C6ADE',
    orange: '#F49342',
    pink: '#FD5CA8',
    teal: '#00A0AC',
    indigo: '#5E4DB2',
    red: '#D84B65',
    green: '#00A47C',
    yellow: '#F4CD00',
    purple: '#A26FF9'
  };

  // Gradient backgrounds for cards
  const cardGradients = {
    purple: 'linear-gradient(135deg, #9C6ADE 0%, #7048AA 100%)',
    blue: 'linear-gradient(135deg, #5C6AC4 0%, #3A4CB2 100%)',
    teal: 'linear-gradient(135deg, #47C1BF 0%, #139A97 100%)',
    green: 'linear-gradient(135deg, #50B83C 0%, #2D9319 100%)',
    orange: 'linear-gradient(135deg, #F49342 0%, #DB7722 100%)',
  };

  // Colorful data with more months
  const data = [
    { name: 'Jan', traffic: 4000, conversion: 1.2, goals: 120, clicks: 5230 },
    { name: 'Feb', traffic: 4200, conversion: 1.4, goals: 132, clicks: 5450 },
    { name: 'Mar', traffic: 4500, conversion: 1.5, goals: 145, clicks: 5780 },
    { name: 'Apr', traffic: 4700, conversion: 1.7, goals: 159, clicks: 6120 },
    { name: 'May', traffic: 4900, conversion: 1.8, goals: 176, clicks: 6340 },
    { name: 'Jun', traffic: 5200, conversion: 2.1, goals: 210, clicks: 6780 },
    { name: 'Jul', traffic: 5500, conversion: 2.3, goals: 235, clicks: 7120 },
  ];

  // Pie chart data
  const deviceData = [
    { name: 'Mobile', value: 54 },
    { name: 'Desktop', value: 36 },
    { name: 'Tablet', value: 10 },
  ];

  // Bar chart data for source traffic
  const sourceData = [
    { name: 'Organic', value: 65, color: colors.primary },
    { name: 'Social', value: 20, color: colors.purple },
    { name: 'Direct', value: 10, color: colors.teal },
    { name: 'Referral', value: 5, color: colors.orange },
  ];

  const popularKeywords = [
    { 
      name: 'SEO Optimization', 
      ranking: '#1',
      trend: 'up',
      avatar: 'SO',
      difficulty: 'Medium',
      color: colors.purple
    },
    { 
      name: 'Backlink Strategy', 
      ranking: '#3',
      trend: 'up',
      avatar: 'BS',
      difficulty: 'Hard',
      color: colors.teal
    },
    { 
      name: 'On-Page SEO', 
      ranking: '#5',
      trend: 'stable',
      avatar: 'OP',
      difficulty: 'Easy',
      color: colors.success
    },
    { 
      name: 'Keyword Research', 
      ranking: '#7',
      trend: 'down',
      avatar: 'KR',
      difficulty: 'Medium',
      color: colors.warning
    },
  ];

  const tabs = [
    {
      id: 'dashboard',
      content: 'Dashboard',
      accessibilityLabel: 'Dashboard',
      panelID: 'dashboard-content',
    },
    {
      id: 'keywords',
      content: 'Keywords',
      accessibilityLabel: 'Keywords',
      panelID: 'keywords-content',
    },
    {
      id: 'backlinks',
      content: 'Backlinks',
      accessibilityLabel: 'Backlinks',
      panelID: 'backlinks-content',
    },
    {
      id: 'audits',
      content: 'Audits',
      accessibilityLabel: 'Audits',
      panelID: 'audits-content',
    },
  ];

  const handleTabChange = (selectedTabIndex) => setSelected(selectedTabIndex);

  // Badge status based on score
  const getBadgeStatus = (score) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'critical';
  };

  // Trend indicator component
  const TrendIndicator = ({ value, suffix }) => {
    const isPositive = value > 0;
    return (
      <TextStyle variation={isPositive ? "positive" : "negative"}>
        {isPositive ? '↑' : '↓'} {Math.abs(value)}{suffix}
      </TextStyle>
    );
  };

  // Colorful metric card component
  const ColorfulMetricCard = ({ backgroundColor, icon, title, value, trend, suffix }) => (
    <div style={{
      background: backgroundColor,
      borderRadius: '8px',
      padding: '20px',
      color: 'white',
      height: '100%',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '10px'
      }}>
        <div style={{ 
          fontSize: '16px', 
          fontWeight: '500',
          opacity: '0.9'
        }}>
          {title}
        </div>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px',
          fontWeight: 'bold'
        }}>
          {icon}
        </div>
      </div>
      <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>
        {value}
      </div>
      <div style={{ 
        fontSize: '14px',
        backgroundColor: 'rgba(255,255,255,0.15)',
        padding: '4px 12px',
        borderRadius: '16px',
        display: 'inline-block'
      }}>
        {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}{suffix}
      </div>
    </div>
  );

  return (
    <AppProvider i18n={{}}>
      <div style={{ width: '100vw', height: '100vh', overflow: 'auto', backgroundColor: '#F4F6F8' }}>
        <Page 
          title="SEO Performance Dashboard"
          titleMetadata={<Badge status="success">PRO</Badge>}
          primaryAction={{content: 'Run Full Audit', primary: true}}
          secondaryActions={[
            {content: 'Export Report'},
            {content: 'Schedule Tasks'},
          ]}
          divider
          fullWidth
        >
          <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange} fitted />

          <div style={{ marginTop: '20px', padding: '0 0' }}>
            <Banner
              title="Optimization opportunity detected!"
              status="info"
              action={{content: 'View details'}}
            >
              <p>Our analysis found 15 pages with missing meta descriptions that could improve your rankings by up to 25%!</p>
            </Banner>
          </div>

          <Layout>
            <Layout.Section>
              <Card sectioned style={{ width: '100%' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '15px',
                  alignItems: 'center'
                }}>
                  <div>
                    <Heading>Overall SEO Health</Heading>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      marginTop: '5px',
                      color: '#637381'
                    }}>
                      Based on 42 ranking factors
                    </div>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <div style={{
                      backgroundColor: '#F4F6F8',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontWeight: 'bold'
                    }}>
                      Last updated: Today
                    </div>
                    <Badge status={getBadgeStatus(87)}>87%</Badge>
                  </div>
                </div>
                
                <div style={{ height: '15px', borderRadius: '10px', overflow: 'hidden' }}>
                  <ProgressBar progress={87} size="large" color="primary" />
                </div>
                
                <div style={{
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  marginTop: '15px',
                  padding: '10px 20px',
                  backgroundColor: '#F9FAFB',
                  borderRadius: '8px',
                  alignItems: 'center'
                }}>
                  <div>
                    <TextStyle variation="positive" style={{ fontSize: '16px', fontWeight: '500' }}>
                      +5.2% vs last month
                    </TextStyle>
                    <div style={{ fontSize: '13px', color: '#637381', marginTop: '4px' }}>
                      Moving in the right direction!
                    </div>
                  </div>
                  <Button plain>View details</Button>
                </div>
              </Card>
            </Layout.Section>

            {/* Redesigned Quick Actions section - now placed before the metrics */}
            <Layout.Section>
              <Card title="Quick Actions">
                <Card.Section>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(4, 1fr)', 
                    gap: '16px'
                  }}>
                    <Button 
                      primary 
                      size="large"
                      style={{ 
                        height: '100px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '20px 10px'
                      }}
                    >
                      <div style={{ fontSize: '24px', marginBottom: '10px' }}>🔍</div>
                      <div>Run SEO Audit</div>
                    </Button>
                    
                    <Button 
                      style={{
                        background: 'linear-gradient(90deg, #5C6AC4 0%, #9C6ADE 100%)',
                        color: 'white',
                        height: '100px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '20px 10px'
                      }}
                    >
                      <div style={{ fontSize: '24px', marginBottom: '10px' }}>🔗</div>
                      <div>Fix Broken Links</div>
                    </Button>
                    
                    <Button 
                      style={{
                        background: 'linear-gradient(90deg, #47C1BF 0%, #50B83C 100%)',
                        color: 'white',
                        height: '100px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '20px 10px'
                      }}
                    >
                      <div style={{ fontSize: '24px', marginBottom: '10px' }}>📋</div>
                      <div>Optimize Meta Tags</div>
                    </Button>
                    
                    <Button 
                      style={{
                        background: 'linear-gradient(90deg, #F49342 0%, #EEC200 100%)',
                        color: 'white',
                        height: '100px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '20px 10px'
                      }}
                    >
                      <div style={{ fontSize: '24px', marginBottom: '10px' }}>📊</div>
                      <div>Analyze Competitors</div>
                    </Button>
                  </div>
                </Card.Section>
              </Card>
            </Layout.Section>

            <Layout.Section>
              <div style={{ display: 'flex', gap: '16px', height: '150px', width: '100%' }}>
                <div style={{ flex: 1 }}>
                  <ColorfulMetricCard 
                    backgroundColor={cardGradients.blue}
                    icon="🔍"
                    title="Top Keywords"
                    value="15"
                    trend={3}
                    suffix=" new"
                  />
                </div>
                
                <div style={{ flex: 1 }}>
                  <ColorfulMetricCard 
                    backgroundColor={cardGradients.teal}
                    icon="📄"
                    title="Indexed Pages"
                    value="3,457"
                    trend={2.5}
                    suffix="%"
                  />
                </div>
                
                <div style={{ flex: 1 }}>
                  <ColorfulMetricCard 
                    backgroundColor={cardGradients.orange}
                    icon="🔗"
                    title="Broken Links"
                    value="45"
                    trend={-10}
                    suffix="%"
                  />
                </div>
                
                <div style={{ flex: 1 }}>
                  <ColorfulMetricCard 
                    backgroundColor={cardGradients.purple}
                    icon="📈"
                    title="Avg. Position"
                    value="14.3"
                    trend={-2.1}
                    suffix=" positions"
                  />
                </div>
              </div>
            </Layout.Section>

            <Layout.Section>
              <Card 
                sectioned 
                title={
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <span>Organic Traffic & Conversions</span>
                    <ButtonGroup segmented>
                      <Button pressed size="slim">7 Days</Button>
                      <Button size="slim">30 Days</Button>
                      <Button size="slim">90 Days</Button>
                      <Button size="slim">1 Year</Button>
                    </ButtonGroup>
                  </div>
                }
                style={{ width: '100%' }}
              >
                <div style={{ height: '320px', width: '100%' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                      <defs>
                        <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={colors.primary} stopOpacity={0.8}/>
                          <stop offset="95%" stopColor={colors.primary} stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="colorGoals" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={colors.teal} stopOpacity={0.8}/>
                          <stop offset="95%" stopColor={colors.teal} stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={colors.purple} stopOpacity={0.8}/>
                          <stop offset="95%" stopColor={colors.purple} stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis dataKey="name" stroke="#999" />
                      <YAxis stroke="#999" />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: '#ffffff',
                          borderRadius: '8px',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                          border: 'none',
                          padding: '10px'
                        }}
                      />
                      <Legend />
                      <Area 
                        name="Traffic"
                        type="monotone" 
                        dataKey="traffic" 
                        stroke={colors.primary} 
                        fillOpacity={1} 
                        fill="url(#colorTraffic)" 
                        strokeWidth={2} 
                        dot={{r: 4, strokeWidth: 2, stroke: colors.primary, fill: 'white'}}
                        activeDot={{r: 6, stroke: colors.primary, strokeWidth: 2, fill: 'white'}}
                      />
                      <Area 
                        name="Goals"
                        type="monotone" 
                        dataKey="goals" 
                        stroke={colors.teal} 
                        fillOpacity={1} 
                        fill="url(#colorGoals)" 
                        strokeWidth={2} 
                        dot={{r: 4, strokeWidth: 2, stroke: colors.teal, fill: 'white'}}
                        activeDot={{r: 6, stroke: colors.teal, strokeWidth: 2, fill: 'white'}}
                      />
                      <Area 
                        name="Clicks"
                        type="monotone" 
                        dataKey="clicks" 
                        stroke={colors.purple} 
                        fillOpacity={1} 
                        fill="url(#colorClicks)" 
                        strokeWidth={2} 
                        dot={{r: 4, strokeWidth: 2, stroke: colors.purple, fill: 'white'}}
                        activeDot={{r: 6, stroke: colors.purple, strokeWidth: 2, fill: 'white'}}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </Layout.Section>

            <Layout.Section>
              <div style={{ display: 'flex', gap: '16px', width: '100%' }}>
                <div style={{ flex: 1, width: '50%' }}>
                  <Card title="Device Breakdown" sectioned>
                    <div style={{ height: '240px', width: '100%' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={deviceData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                            labelLine={false}
                          >
                            <Cell fill={colors.primary} />
                            <Cell fill={colors.teal} />
                            <Cell fill={colors.purple} />
                          </Pie>
                          <Tooltip 
                            formatter={(value) => [`${value}%`, 'Traffic']}
                            contentStyle={{
                              backgroundColor: '#ffffff',
                              borderRadius: '8px',
                              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                              border: 'none'
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </Card>
                </div>
                <div style={{ flex: 1, width: '50%' }}>
                  <Card title="Traffic Sources" sectioned>
                    <div style={{ height: '240px', width: '100%' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={sourceData}
                          layout="vertical"
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <XAxis type="number" />
                          <YAxis dataKey="name" type="category" width={80} />
                          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                          <Tooltip
                            formatter={(value) => [`${value}%`, 'Traffic']}
                            contentStyle={{
                              backgroundColor: '#ffffff',
                              borderRadius: '8px',
                              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                              border: 'none'
                            }}
                          />
                          <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                            {sourceData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </Card>
                </div>
              </div>
            </Layout.Section>

            <Layout.Section secondary>
              <Card 
                title="Top Performing Keywords"
                actions={[{content: 'View all'}]}
                style={{ width: '100%' }}
              >
                <Card.Section>
                  <ResourceList
                    resourceName={{ singular: 'keyword', plural: 'keywords' }}
                    items={popularKeywords}
                    renderItem={(item) => (
                      <ResourceList.Item
                        id={item.name}
                        media={
                          <Avatar customer size="medium" name={item.name} source="" backgroundColor={item.color}>
                            {item.avatar}
                          </Avatar>
                        }
                        accessibilityLabel={`View details for ${item.name}`}
                      >
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                          <div>
                            <TextStyle variation="strong">{item.name}</TextStyle>
                            <div style={{marginTop: '4px'}}>
                              <Badge status={item.trend === 'up' ? 'success' : item.trend === 'down' ? 'warning' : 'info'}>
                                {item.ranking}
                              </Badge>
                              <span style={{marginLeft: '8px'}}>
                                <Badge>{item.difficulty}</Badge>
                              </span>
                            </div>
                          </div>
                          <Button size="slim" primary>Optimize</Button>
                        </div>
                      </ResourceList.Item>
                    )}
                  />
                </Card.Section>
              </Card>
            </Layout.Section>
          </Layout>
        </Page>
      </div>
    </AppProvider>
  );
};

export default Dashboard;
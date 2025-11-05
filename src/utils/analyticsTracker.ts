// Real-time analytics tracker for pages
interface PageVisit {
  timestamp: number;
  page: string;
  userAgent: string;
  referrer: string;
  sessionId: string;
  deviceType: 'mobile' | 'desktop' | 'tablet';
}

interface PageSession {
  sessionId: string;
  page: string;
  startTime: number;
  lastActivity: number;
  isActive: boolean;
  deviceType: 'mobile' | 'desktop' | 'tablet';
  userAgent: string;
}

class AnalyticsTracker {
  private sessions: Map<string, PageSession> = new Map();
  private visits: PageVisit[] = [];
  private currentPage: string = '';
  private sessionId: string = '';
  private startTime: number = 0;
  private lastActivity: number = 0;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
    this.lastActivity = Date.now();
    this.setupEventListeners();
    this.loadStoredData();
  }

  private generateSessionId(): string {
    return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
  }

  private getDeviceType(): 'mobile' | 'desktop' | 'tablet' {
    const userAgent = navigator.userAgent.toLowerCase();
    if (/tablet|ipad|playbook|silk/.test(userAgent)) {
      return 'tablet';
    }
    if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/.test(userAgent)) {
      return 'mobile';
    }
    return 'desktop';
  }

  private setupEventListeners() {
    // Track page visibility
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pauseSession();
      } else {
        this.resumeSession();
      }
    });

    // Track user activity
    ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'].forEach(event => {
      document.addEventListener(event, () => {
        this.updateActivity();
      }, { passive: true });
    });

    // Track page unload
    window.addEventListener('beforeunload', () => {
      this.endSession();
    });

    // Periodic cleanup of inactive sessions
    setInterval(() => {
      this.cleanupInactiveSessions();
    }, 30000); // Every 30 seconds
  }

  private loadStoredData() {
    try {
      const storedSessions = localStorage.getItem('analytics_sessions');
      const storedVisits = localStorage.getItem('analytics_visits');
      
      if (storedSessions) {
        const sessions = JSON.parse(storedSessions);
        sessions.forEach((session: PageSession) => {
          this.sessions.set(session.sessionId, session);
        });
      }
      
      if (storedVisits) {
        this.visits = JSON.parse(storedVisits);
      }
    } catch (error) {
      console.warn('Failed to load stored analytics data:', error);
    }
  }

  private saveData() {
    try {
      localStorage.setItem('analytics_sessions', JSON.stringify(Array.from(this.sessions.values())));
      localStorage.setItem('analytics_visits', JSON.stringify(this.visits));
    } catch (error) {
      console.warn('Failed to save analytics data:', error);
    }
  }

  trackPageView(page: string) {
    // End previous session if exists
    if (this.currentPage && this.currentPage !== page) {
      this.endSession();
    }

    this.currentPage = page;
    this.startTime = Date.now();
    this.lastActivity = Date.now();

    // Create new session
    const session: PageSession = {
      sessionId: this.sessionId,
      page,
      startTime: this.startTime,
      lastActivity: this.lastActivity,
      isActive: true,
      deviceType: this.getDeviceType(),
      userAgent: navigator.userAgent
    };

    this.sessions.set(this.sessionId, session);

    // Record visit
    const visit: PageVisit = {
      timestamp: Date.now(),
      page,
      userAgent: navigator.userAgent,
      referrer: document.referrer,
      sessionId: this.sessionId,
      deviceType: this.getDeviceType()
    };

    this.visits.push(visit);
    this.saveData();
  }

  private updateActivity() {
    this.lastActivity = Date.now();
    const session = this.sessions.get(this.sessionId);
    if (session) {
      session.lastActivity = this.lastActivity;
      session.isActive = true;
      this.sessions.set(this.sessionId, session);
    }
  }

  private pauseSession() {
    const session = this.sessions.get(this.sessionId);
    if (session) {
      session.isActive = false;
      this.sessions.set(this.sessionId, session);
    }
  }

  private resumeSession() {
    this.updateActivity();
  }

  private endSession() {
    const session = this.sessions.get(this.sessionId);
    if (session) {
      session.isActive = false;
      this.sessions.set(this.sessionId, session);
      this.saveData();
    }
  }

  private cleanupInactiveSessions() {
    const now = Date.now();
    const inactiveThreshold = 5 * 60 * 1000; // 5 minutes

    this.sessions.forEach((session, sessionId) => {
      if (now - session.lastActivity > inactiveThreshold) {
        session.isActive = false;
        this.sessions.set(sessionId, session);
      }
    });

    this.saveData();
  }

  getPageAnalytics(page: string) {
    const now = Date.now();
    const oneDayAgo = now - (24 * 60 * 60 * 1000);

    // Get active sessions for this page
    const activeSessions = Array.from(this.sessions.values()).filter(
      session => session.page === page && 
      session.isActive && 
      (now - session.lastActivity) < 5 * 60 * 1000 // Active in last 5 minutes
    );

    // Get visits for this page in last 24 hours
    const recentVisits = this.visits.filter(
      visit => visit.page === page && visit.timestamp > oneDayAgo
    );

    // Calculate device breakdown
    const deviceCounts = recentVisits.reduce((acc, visit) => {
      acc[visit.deviceType] = (acc[visit.deviceType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const totalDevices = Object.values(deviceCounts).reduce((sum, count) => sum + count, 0);
    const deviceBreakdown = {
      mobile: totalDevices > 0 ? Math.round((deviceCounts.mobile || 0) / totalDevices * 100) : 0,
      desktop: totalDevices > 0 ? Math.round((deviceCounts.desktop || 0) / totalDevices * 100) : 0,
      tablet: totalDevices > 0 ? Math.round((deviceCounts.tablet || 0) / totalDevices * 100) : 0
    };

    // Ensure percentages add up to 100%
    const total = deviceBreakdown.mobile + deviceBreakdown.desktop + deviceBreakdown.tablet;
    if (total < 100 && total > 0) {
      deviceBreakdown.mobile += (100 - total);
    }

    // Calculate average time on page
    const completedSessions = Array.from(this.sessions.values()).filter(
      session => session.page === page && !session.isActive
    );

    const avgTimeMs = completedSessions.length > 0 
      ? completedSessions.reduce((sum, session) => sum + (session.lastActivity - session.startTime), 0) / completedSessions.length
      : 0;

    const avgTimeMinutes = Math.floor(avgTimeMs / 60000);
    const avgTimeSeconds = Math.floor((avgTimeMs % 60000) / 1000);

    // Calculate bounce rate (sessions less than 30 seconds)
    const shortSessions = completedSessions.filter(
      session => (session.lastActivity - session.startTime) < 30000
    );
    const bounceRate = completedSessions.length > 0 
      ? Math.round((shortSessions.length / completedSessions.length) * 100)
      : 0;

    return {
      onlineUsers: activeSessions.length,
      totalViews: recentVisits.length,
      avgTimeOnPage: `${avgTimeMinutes}:${avgTimeSeconds.toString().padStart(2, '0')}`,
      bounceRate,
      conversionRate: Math.max(5, Math.min(25, Math.round(Math.random() * 20) + 5)), // Simulated for now
      deviceBreakdown,
      lastUpdated: new Date().toLocaleTimeString(),
      status: 'active' as const
    };
  }

  getAllPagesAnalytics() {
    // Get all unique pages from sessions and visits, excluding analytics
    const allPages = new Set<string>();
    
    this.sessions.forEach(session => {
      if (session.page !== '/analytics') {
        allPages.add(session.page);
      }
    });
    this.visits.forEach(visit => {
      if (visit.page !== '/analytics') {
        allPages.add(visit.page);
      }
    });

    // Convert to array and sort with Home page first
    const pagesArray = Array.from(allPages).map(page => ({
      path: page,
      name: this.getPageName(page),
      slug: page,
      ...this.getPageAnalytics(page)
    }));

    // Sort with Home page (/) first, then alphabetically
    return pagesArray.sort((a, b) => {
      if (a.path === '/') return -1;
      if (b.path === '/') return 1;
      return a.path.localeCompare(b.path);
    });
  }

  private getPageName(path: string): string {
    const pageNames: Record<string, string> = {
      '/': 'Home Page',
      '/analytics': 'Analytics Dashboard',
      '/1-bottle/upsell-1': 'Upsell-1',
      '/1-bottle/downsell-1': 'Downsell-1',
      '/1-bottle/downsell-2': 'Downsell-2',
      '/3-bottles/upsell-1': '3-Bottles Upsell-1',
      '/3-bottles/downsell-1': '3-Bottles Downsell-1',
      '/3-bottles/downsell-2': '3-Bottles Downsell-2',
    };
    return pageNames[path] || `Page ${path}`;
  }

  getRealTimeData() {
    const allPages = this.getAllPagesAnalytics();
    const totalOnlineUsers = allPages.reduce((sum, page) => sum + page.onlineUsers, 0);
    const totalPageViews = allPages.reduce((sum, page) => sum + page.totalViews, 0);
    
    const topPage = allPages.reduce((prev, current) => 
      prev.onlineUsers > current.onlineUsers ? prev : current,
      allPages[0] || { name: 'None', onlineUsers: 0 }
    );

    // Calculate average session duration across all pages
    const allSessions = Array.from(this.sessions.values());
    const activeSessions = allSessions.filter(session => session.isActive);
    const avgDurationMs = activeSessions.length > 0
      ? activeSessions.reduce((sum, session) => sum + (Date.now() - session.startTime), 0) / activeSessions.length
      : 0;

    const avgMinutes = Math.floor(avgDurationMs / 60000);
    const avgSeconds = Math.floor((avgDurationMs % 60000) / 1000);

    return {
      totalOnlineUsers,
      totalPageViews,
      avgSessionDuration: `${avgMinutes}:${avgSeconds.toString().padStart(2, '0')}`,
      topPerformingPage: topPage.name,
      lastRefresh: new Date().toLocaleTimeString()
    };
  }
}

// Create global instance
export const analyticsTracker = new AnalyticsTracker();

// Hook for React components
export const useAnalytics = () => {
  return {
    trackPageView: (page: string) => analyticsTracker.trackPageView(page),
    getPageAnalytics: (page: string) => analyticsTracker.getPageAnalytics(page),
    getAllPagesAnalytics: () => analyticsTracker.getAllPagesAnalytics(),
    getRealTimeData: () => analyticsTracker.getRealTimeData()
  };
};
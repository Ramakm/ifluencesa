# Windsurf Frontend Design Plan

## Page Layouts & Components

### 1. Landing Page (`/`)
```tsx
// Modern hero section with gradient background
- Hero: "Turn Your Influence Into Professional Media Kits"
- Features grid: Engagement Analysis, PDF Generation, Shareable Links
- Social proof: "Join 1000+ creators" 
- CTA: "Get Started Free" → /signup
- Footer with links

Components:
- HeroSection.tsx
- FeatureGrid.tsx  
- TestimonialSection.tsx
- CTASection.tsx
```

### 2. Authentication Pages (`/login`, `/signup`)
```tsx
// Clean, centered forms with Supabase auth
- Logo + tagline
- Email/password form (shadcn/ui Input, Button)
- Social login options (Google, Twitter)
- "Remember me" checkbox
- Link to opposite page
- Loading states & error handling

Components:
- AuthLayout.tsx (shared wrapper)
- LoginForm.tsx
- SignupForm.tsx
- SocialAuthButtons.tsx
```

### 3. Dashboard (`/dashboard`)
```tsx
// Two-column layout: Form + Preview
Left Column:
- Platform selector (Instagram/TikTok/YouTube)
- Handle input (@username)
- Followers count input
- Last 3 posts data entry (likes, comments)
- "Analyze Engagement" button

Right Column:
- Live preview of engagement rate
- Chart showing post performance
- Media kit preview thumbnail
- "Generate Media Kit" button

Components:
- DashboardLayout.tsx
- AnalyzerForm.tsx
- EngagementChart.tsx
- MediaKitPreview.tsx
- StatsCard.tsx
```

### 4. Media Kit Page (`/media-kit/[username]`)
```tsx
// Public, shareable media kit display
- Clean, professional layout
- Profile header (avatar, name, handle, followers)
- Engagement metrics section
- Top posts grid
- Bio/description
- Contact CTA
- "Powered by Windsurf" footer

Components:
- MediaKitLayout.tsx
- ProfileHeader.tsx
- EngagementStats.tsx
- TopPostsGrid.tsx
- ContactSection.tsx
```

### 5. Settings Page (`/settings`)
```tsx
// User profile management
- Profile information form
- Connected social accounts
- Billing/subscription (future)
- Account deletion
- Export data

Components:
- SettingsLayout.tsx
- ProfileForm.tsx
- ConnectedAccounts.tsx
- BillingSection.tsx (placeholder)
```

## shadcn/ui Components to Use

### Core UI Components
```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add label
npx shadcn-ui@latest add card
npx shadcn-ui@latest add form
npx shadcn-ui@latest add select
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add avatar
npx shadcn-ui@latest add separator
npx shadcn-ui@latest add toast
npx shadcn-ui@latest add alert
npx shadcn-ui@latest add skeleton
npx shadcn-ui@latest add tabs
npx shadcn-ui@latest add dialog
```

### Layout Components
```bash
npx shadcn-ui@latest add navigation-menu
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add sheet
```

## Color Scheme & Branding

### Primary Colors
```css
:root {
  --primary: 220 70% 50%;        /* Blue */
  --primary-foreground: 0 0% 98%; 
  --secondary: 280 60% 50%;      /* Purple accent */
  --accent: 45 100% 60%;         /* Gold highlights */
  --muted: 220 14% 96%;          /* Light gray */
  --border: 220 13% 91%;
}
```

### Typography
- **Headings**: Inter (font-semibold, font-bold)
- **Body**: Inter (font-normal)
- **Monospace**: JetBrains Mono (for handles, metrics)

### Component Patterns
- **Cards**: Subtle shadows, rounded corners (rounded-lg)
- **Buttons**: Gradient backgrounds for primary actions
- **Forms**: Clean inputs with proper validation states
- **Charts**: Minimal, data-focused with brand colors

## Responsive Design

### Breakpoints
- **Mobile**: 320px - 768px (single column)
- **Tablet**: 768px - 1024px (adapted layouts)
- **Desktop**: 1024px+ (full multi-column)

### Mobile-First Approach
- Stack dashboard columns vertically on mobile
- Collapsible navigation menu
- Touch-friendly button sizes (min 44px)
- Optimized media kit display for mobile sharing

## State Management

### SWR for Data Fetching
```tsx
// Custom hooks for API calls
const { data: profile, error, mutate } = useSWR('/api/profile', fetcher)
const { data: mediaKit } = useSWR(`/api/media-kit/${username}`, fetcher)
```

### Form State
```tsx
// React Hook Form with Zod validation
const form = useForm<AnalyzerFormData>({
  resolver: zodResolver(analyzerSchema),
  defaultValues: { platform: 'instagram', followers: 0 }
})
```

### Authentication State
```tsx
// Supabase auth context
const { user, loading, signOut } = useAuth()
```

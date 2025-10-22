# Ifluencesa Media Kit PDF Template Design

## Template Structure

### Page Layout
- **Size**: A4 (210mm x 297mm)
- **Margins**: 20mm all sides
- **Colors**: Brand blue (#3B82F6), accent purple (#8B5CF6), neutral grays
- **Fonts**: Inter (headings), Open Sans (body text)

### Section Breakdown

#### 1. Header Section (Top 25%)
```html
<!-- Profile header with gradient background -->
<div class="header-section">
    <div class="profile-container">
        <img src="{{ avatar_url }}" class="profile-avatar" />
        <div class="profile-info">
            <h1>{{ full_name }}</h1>
            <h2>@{{ handle }}</h2>
            <p class="platform-badge">{{ platform.title() }}</p>
        </div>
    </div>
    <div class="follower-count">
        <span class="count">{{ followers | format_number }}</span>
        <span class="label">Followers</span>
    </div>
</div>
```

#### 2. Engagement Metrics (25%)
```html
<!-- Key metrics in card layout -->
<div class="metrics-section">
    <div class="metric-card primary">
        <span class="metric-value">{{ engagement_rate }}%</span>
        <span class="metric-label">Engagement Rate</span>
    </div>
    <div class="metric-card">
        <span class="metric-value">{{ avg_likes | format_number }}</span>
        <span class="metric-label">Avg Likes</span>
    </div>
    <div class="metric-card">
        <span class="metric-value">{{ avg_comments | format_number }}</span>
        <span class="metric-label">Avg Comments</span>
    </div>
    <div class="metric-card">
        <span class="metric-value">{{ quality.title() }}</span>
        <span class="metric-label">Quality Score</span>
    </div>
</div>
```

#### 3. Bio & Description (20%)
```html
<!-- Bio section with branded styling -->
<div class="bio-section">
    <h3>About</h3>
    <p class="bio-text">{{ bio or "Passionate content creator building authentic connections with engaged audiences." }}</p>
    
    {% if insights %}
    <div class="insights">
        <h4>Key Insights</h4>
        <ul>
        {% for insight in insights[:3] %}
            <li>{{ insight }}</li>
        {% endfor %}
        </ul>
    </div>
    {% endif %}
</div>
```

#### 4. Top Posts Grid (25%)
```html
<!-- Top performing posts showcase -->
<div class="posts-section">
    <h3>Top Performing Content</h3>
    <div class="posts-grid">
    {% for post in top_posts[:6] %}
        <div class="post-card">
            {% if post.image_url %}
            <img src="{{ post.image_url }}" class="post-image" />
            {% else %}
            <div class="post-placeholder">
                <span class="platform-icon">📱</span>
            </div>
            {% endif %}
            <div class="post-stats">
                <span class="likes">❤️ {{ post.likes | format_number }}</span>
                <span class="comments">💬 {{ post.comments | format_number }}</span>
            </div>
        </div>
    {% endfor %}
    </div>
</div>
```

#### 5. Footer & Contact (5%)
```html
<!-- Contact info and branding -->
<div class="footer-section">
    <div class="contact-info">
        <span class="contact-label">Contact:</span>
        <span class="contact-email">{{ contact_email or "Available upon request" }}</span>
    </div>
    <div class="branding">
        <span class="powered-by">Powered by Ifluencesa</span>
        <span class="generated-date">Generated {{ generated_at | format_date }}</span>
    </div>
</div>
```

## CSS Styling

### Base Styles
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Open+Sans:wght@400;500;600&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Open Sans', sans-serif;
    font-size: 14px;
    line-height: 1.5;
    color: #1f2937;
    background: white;
}

.page {
    width: 210mm;
    height: 297mm;
    padding: 20mm;
    margin: 0 auto;
    background: white;
    position: relative;
}

h1, h2, h3, h4 {
    font-family: 'Inter', sans-serif;
    font-weight: 600;
}

h1 { font-size: 28px; color: #1f2937; }
h2 { font-size: 18px; color: #6b7280; }
h3 { font-size: 16px; color: #374151; margin-bottom: 12px; }
h4 { font-size: 14px; color: #4b5563; margin-bottom: 8px; }
```

### Header Section
```css
.header-section {
    background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
    border-radius: 12px;
    padding: 24px;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
}

.profile-container {
    display: flex;
    align-items: center;
    gap: 20px;
}

.profile-avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 3px solid rgba(255, 255, 255, 0.3);
    object-fit: cover;
}

.profile-info h1 {
    color: white;
    margin-bottom: 4px;
}

.profile-info h2 {
    color: rgba(255, 255, 255, 0.9);
    font-weight: 400;
    margin-bottom: 8px;
}

.platform-badge {
    background: rgba(255, 255, 255, 0.2);
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.follower-count {
    text-align: center;
}

.follower-count .count {
    display: block;
    font-size: 32px;
    font-weight: 700;
    font-family: 'Inter', sans-serif;
}

.follower-count .label {
    font-size: 12px;
    opacity: 0.9;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}
```

### Metrics Section
```css
.metrics-section {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-bottom: 24px;
}

.metric-card {
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 20px 16px;
    text-align: center;
    transition: all 0.2s ease;
}

.metric-card.primary {
    background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
    color: white;
    border: none;
}

.metric-value {
    display: block;
    font-size: 24px;
    font-weight: 700;
    font-family: 'Inter', sans-serif;
    margin-bottom: 4px;
}

.metric-label {
    font-size: 12px;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 500;
}

.metric-card.primary .metric-label {
    color: rgba(255, 255, 255, 0.9);
}
```

### Bio Section
```css
.bio-section {
    background: #f8fafc;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 24px;
}

.bio-text {
    font-size: 15px;
    line-height: 1.6;
    color: #374151;
    margin-bottom: 16px;
}

.insights ul {
    list-style: none;
    padding: 0;
}

.insights li {
    padding: 8px 0;
    padding-left: 20px;
    position: relative;
    font-size: 13px;
    color: #4b5563;
}

.insights li:before {
    content: "✓";
    position: absolute;
    left: 0;
    color: #10b981;
    font-weight: bold;
}
```

### Posts Grid
```css
.posts-section {
    margin-bottom: 24px;
}

.posts-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
}

.post-card {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    overflow: hidden;
    transition: all 0.2s ease;
}

.post-image {
    width: 100%;
    height: 120px;
    object-fit: cover;
}

.post-placeholder {
    width: 100%;
    height: 120px;
    background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
}

.post-stats {
    padding: 12px;
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #6b7280;
    font-weight: 500;
}
```

### Footer
```css
.footer-section {
    position: absolute;
    bottom: 20mm;
    left: 20mm;
    right: 20mm;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 16px;
    border-top: 1px solid #e5e7eb;
    font-size: 12px;
    color: #6b7280;
}

.contact-email {
    color: #3b82f6;
    font-weight: 500;
}

.powered-by {
    color: #8b5cf6;
    font-weight: 600;
}
```

## Template Filters (Jinja2)

```python
def format_number(value):
    """Format numbers with K/M suffixes"""
    if value >= 1000000:
        return f"{value/1000000:.1f}M"
    elif value >= 1000:
        return f"{value/1000:.1f}K"
    return str(value)

def format_date(value):
    """Format date for display"""
    return value.strftime("%B %d, %Y")
```

## PDF Generation Options

### WeasyPrint Configuration
```python
from weasyprint import HTML, CSS
from weasyprint.fonts import FontConfiguration

def generate_pdf(html_content, css_content):
    font_config = FontConfiguration()
    
    html = HTML(string=html_content)
    css = CSS(string=css_content, font_config=font_config)
    
    return html.write_pdf(
        stylesheets=[css],
        font_config=font_config,
        optimize_images=True
    )
```

### Alternative: Puppeteer (Node.js)
```javascript
const puppeteer = require('puppeteer');

async function generatePDF(html) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    await page.setContent(html);
    
    const pdf = await page.pdf({
        format: 'A4',
        margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' },
        printBackground: true
    });
    
    await browser.close();
    return pdf;
}
```

import os
import tempfile
from typing import Dict, Any, Optional
from datetime import datetime
from jinja2 import Environment, FileSystemLoader, select_autoescape
from weasyprint import HTML, CSS
from weasyprint.fonts import FontConfiguration
import logging

logger = logging.getLogger(__name__)

class PDFGenerator:
    """Service for generating PDF media kits from HTML templates"""
    
    def __init__(self):
        # Setup Jinja2 environment
        template_dir = os.path.join(os.path.dirname(__file__), '..', '..', 'templates')
        self.jinja_env = Environment(
            loader=FileSystemLoader(template_dir),
            autoescape=select_autoescape(['html', 'xml'])
        )
        
        # Add custom filters
        self.jinja_env.filters['format_number'] = self._format_number
        self.jinja_env.filters['format_date'] = self._format_date
        
        # Font configuration for WeasyPrint
        self.font_config = FontConfiguration()
    
    def generate_media_kit_pdf(self, media_kit_data: Dict[str, Any]) -> bytes:
        """Generate PDF from media kit data"""
        try:
            # Render HTML template
            html_content = self._render_template('media_kit.html', media_kit_data)
            
            # Generate PDF
            pdf_bytes = self._html_to_pdf(html_content)
            
            logger.info(f"Generated PDF for media kit: {media_kit_data.get('username', 'unknown')}")
            return pdf_bytes
            
        except Exception as e:
            logger.error(f"Failed to generate PDF: {e}")
            raise
    
    def _render_template(self, template_name: str, data: Dict[str, Any]) -> str:
        """Render Jinja2 template with data"""
        try:
            template = self.jinja_env.get_template(template_name)
            
            # Add generated timestamp
            data['generated_at'] = datetime.now()
            
            # Ensure required fields have defaults
            data.setdefault('full_name', data.get('username', 'Creator'))
            data.setdefault('bio', 'Passionate content creator building authentic connections.')
            data.setdefault('top_posts', [])
            data.setdefault('insights', [])
            data.setdefault('contact_email', 'Available upon request')
            
            return template.render(**data)
            
        except Exception as e:
            logger.error(f"Template rendering failed: {e}")
            raise
    
    def _html_to_pdf(self, html_content: str) -> bytes:
        """Convert HTML to PDF using WeasyPrint"""
        try:
            # Create HTML object
            html = HTML(string=html_content)
            
            # Load CSS
            css_path = os.path.join(
                os.path.dirname(__file__), '..', '..', 'templates', 'media_kit.css'
            )
            
            css = None
            if os.path.exists(css_path):
                css = CSS(filename=css_path, font_config=self.font_config)
            
            # Generate PDF
            pdf_bytes = html.write_pdf(
                stylesheets=[css] if css else None,
                font_config=self.font_config,
                optimize_images=True
            )
            
            return pdf_bytes
            
        except Exception as e:
            logger.error(f"PDF generation failed: {e}")
            raise
    
    def _format_number(self, value: int) -> str:
        """Format numbers with K/M suffixes"""
        if value >= 1000000:
            return f"{value/1000000:.1f}M"
        elif value >= 1000:
            return f"{value/1000:.1f}K"
        return str(value)
    
    def _format_date(self, value: datetime) -> str:
        """Format date for display"""
        return value.strftime("%B %d, %Y")
    
    def save_pdf_to_file(self, pdf_bytes: bytes, filename: str) -> str:
        """Save PDF bytes to temporary file and return path"""
        try:
            # Create temporary file
            temp_dir = tempfile.gettempdir()
            file_path = os.path.join(temp_dir, filename)
            
            with open(file_path, 'wb') as f:
                f.write(pdf_bytes)
            
            return file_path
            
        except Exception as e:
            logger.error(f"Failed to save PDF to file: {e}")
            raise

# Alternative implementation using Puppeteer (if needed)
class PuppeteerPDFGenerator:
    """Alternative PDF generator using Puppeteer (requires Node.js)"""
    
    def __init__(self):
        self.puppeteer_available = self._check_puppeteer()
    
    def _check_puppeteer(self) -> bool:
        """Check if Puppeteer is available"""
        try:
            import subprocess
            result = subprocess.run(['node', '--version'], capture_output=True, text=True)
            return result.returncode == 0
        except:
            return False
    
    async def generate_pdf_with_puppeteer(self, html_content: str) -> bytes:
        """Generate PDF using Puppeteer (requires async)"""
        if not self.puppeteer_available:
            raise RuntimeError("Node.js/Puppeteer not available")
        
        # This would require a Node.js script to be called
        # Implementation depends on deployment setup
        pass

# Factory function to get appropriate PDF generator
def get_pdf_generator() -> PDFGenerator:
    """Get PDF generator instance"""
    return PDFGenerator()

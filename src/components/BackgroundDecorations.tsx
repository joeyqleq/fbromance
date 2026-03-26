import fs from 'fs';
import path from 'path';

export function BackgroundDecorations() {
  const svgNames = [
    'lines-1.svg', 'lines-2.svg', 'lines-3.svg', 'lines-4.svg',
    'lines-5.svg', 'lines-7.svg', 'lines-10.svg'
  ];

  const svgs = svgNames.map(name => {
    const filePath = path.join(process.cwd(), 'public', 'images', 'decorations', name);
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Inject circuit-path class into all shape elements to apply the glow and animation
      content = content.replace(/<path/gi, '<path class="circuit-path"');
      content = content.replace(/<line/gi, '<line class="circuit-path"');
      content = content.replace(/<polyline/gi, '<polyline class="circuit-path"');
      content = content.replace(/<polygon/gi, '<polygon class="circuit-path"');
      
      // Strip original stroke/fill colors if they interfere
      content = content.replace(/stroke="[^"]*"/gi, '');
      content = content.replace(/fill="[^"]*"/gi, '');
      
      return content;
    } catch (e) {
      console.warn(`Failed to read SVG: ${name}`);
      return '';
    }
  });

  // Unique positioning for all 7 decorations so they don't overlap much
  const positions = [
    { top: '-10%', left: '-10%', width: '50vw', opacity: 0.15, transform: 'rotate(15deg)' },
    { bottom: '-20%', right: '-15%', width: '60vw', opacity: 0.1, transform: 'rotate(-10deg)' },
    { top: '30%', left: '30%', width: '40vw', opacity: 0.12, transform: 'rotate(45deg)' },
    { bottom: '10%', left: '5%', width: '45vw', opacity: 0.10, transform: 'rotate(-45deg)' },
    { top: '5%', right: '5%', width: '40vw', opacity: 0.08, transform: 'rotate(0deg)' },
    { top: '-5%', left: '60%', width: '35vw', opacity: 0.15, transform: 'rotate(90deg)' },
    { bottom: '-10%', left: '40%', width: '55vw', opacity: 0.12, transform: 'rotate(-25deg)' },
  ];

  // Randomize animation delays and durations via child style injection is hard since it's raw HTML.
  // We'll trust the CSS in globals.css, and maybe add inline styles for animation delay on the wrapper.

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-svg-container">
      {svgs.map((svgContent, index) => {
        if (!svgContent) return null;
        const pos = positions[index];
        
        return (
          <div
            key={index}
            className="absolute flex items-center justify-center [&>svg]:w-full [&>svg]:h-auto [&>svg]:opacity-[0.8]"
            style={{
              ...pos,
              // Different animation delays for the container if we wanted, but the shapes themselves
              // are animating via global CSS keyframes. 
            }}
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        );
      })}
      
      {/* Dynamic CSS injections to stagger the beam animations inside the SVGs depending on container index */}
      <style dangerouslySetInnerHTML={{__html: `
        .bg-svg-container > div:nth-child(even) .circuit-path { animation-duration: 6s; animation-delay: 1.5s; }
        .bg-svg-container > div:nth-child(3n) .circuit-path { animation-duration: 8s; animation-delay: 2.5s; }
        .bg-svg-container > div:nth-child(5n) .circuit-path { animation-duration: 5s; animation-delay: 0.5s; }
        .bg-svg-container > div:nth-child(7n) .circuit-path { animation-duration: 9s; animation-delay: 3.5s; }
      `}} />
    </div>
  );
}

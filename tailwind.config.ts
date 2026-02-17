import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"*.{js,ts,jsx,tsx,mdx}"
	],
	theme: {
    	extend: {
    		fontFamily: {
    			display: [
    				'var(--font-display)',
    				'system-ui',
    				'sans-serif'
    			],
    			mono: [
    				'var(--font-mono)',
    				'ui-monospace',
    				'SFMono-Regular',
    				'monospace'
    			]
    		},
    		colors: {
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			},
    			sidebar: {
    				DEFAULT: 'hsl(var(--sidebar-background))',
    				foreground: 'hsl(var(--sidebar-foreground))',
    				primary: 'hsl(var(--sidebar-primary))',
    				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
    				accent: 'hsl(var(--sidebar-accent))',
    				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
    				border: 'hsl(var(--sidebar-border))',
    				ring: 'hsl(var(--sidebar-ring))'
    			}
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		keyframes: {
    			'accordion-down': {
    				from: {
    					height: '0'
    				},
    				to: {
    					height: 'var(--radix-accordion-content-height)'
    				}
    			},
    			'accordion-up': {
    				from: {
    					height: 'var(--radix-accordion-content-height)'
    				},
    				to: {
    					height: '0'
    				}
    			},
    			fadeIn: {
    				'0%': {
    					opacity: '0'
    				},
    				'100%': {
    					opacity: '1'
    				}
    			},
    			fadeInUp: {
    				'0%': {
    					opacity: '0',
    					transform: 'translateY(20px)'
    				},
    				'100%': {
    					opacity: '1',
    					transform: 'translateY(0)'
    				}
    			},
    			fadeInDown: {
    				'0%': {
    					opacity: '0',
    					transform: 'translateY(-20px)'
    				},
    				'100%': {
    					opacity: '1',
    					transform: 'translateY(0)'
    				}
    			},
    			fadeInLeft: {
    				'0%': {
    					opacity: '0',
    					transform: 'translateX(-20px)'
    				},
    				'100%': {
    					opacity: '1',
    					transform: 'translateX(0)'
    				}
    			},
    			fadeInRight: {
    				'0%': {
    					opacity: '0',
    					transform: 'translateX(20px)'
    				},
    				'100%': {
    					opacity: '1',
    					transform: 'translateX(0)'
    				}
    			},
    			scaleIn: {
    				'0%': {
    					opacity: '0',
    					transform: 'scale(0.9)'
    				},
    				'100%': {
    					opacity: '1',
    					transform: 'scale(1)'
    				}
    			},
    			scaleUp: {
    				'0%': {
    					transform: 'scale(1)'
    				},
    				'100%': {
    					transform: 'scale(1.05)'
    				}
    			},
    			slideInUp: {
    				'0%': {
    					transform: 'translateY(100%)'
    				},
    				'100%': {
    					transform: 'translateY(0)'
    				}
    			},
    			slideInDown: {
    				'0%': {
    					transform: 'translateY(-100%)'
    				},
    				'100%': {
    					transform: 'translateY(0)'
    				}
    			},
    			bounceIn: {
    				'0%': {
    					opacity: '0',
    					transform: 'scale(0.3)'
    				},
    				'50%': {
    					opacity: '1',
    					transform: 'scale(1.05)'
    				},
    				'70%': {
    					transform: 'scale(0.9)'
    				},
    				'100%': {
    					transform: 'scale(1)'
    				}
    			},
    			glow: {
    				'0%, 100%': {
    					boxShadow: '0 0 5px rgba(var(--primary), 0.5)'
    				},
    				'50%': {
    					boxShadow: '0 0 20px rgba(var(--primary), 0.8)'
    				}
    			},
    			'pulse-glow': {
    				'0%, 100%': {
    					opacity: '1'
    				},
    				'50%': {
    					opacity: '0.7'
    				}
    			},
    			'gradient-shift': {
    				'0%, 100%': {
    					backgroundPosition: '0% 50%'
    				},
    				'50%': {
    					backgroundPosition: '100% 50%'
    				}
    			},
    			float: {
    				'0%, 100%': {
    					transform: 'translateY(0px)'
    				},
    				'50%': {
    					transform: 'translateY(-10px)'
    				}
    			},
    			shimmer: {
    				'0%': {
    					backgroundPosition: '-200% 0'
    				},
    				'100%': {
    					backgroundPosition: '200% 0'
    				}
    			}
    		},
    		animation: {
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out',
    			fadeIn: 'fadeIn 0.6s ease-out',
    			fadeInUp: 'fadeInUp 0.6s ease-out',
    			fadeInDown: 'fadeInDown 0.6s ease-out',
    			fadeInLeft: 'fadeInLeft 0.6s ease-out',
    			fadeInRight: 'fadeInRight 0.6s ease-out',
    			scaleIn: 'scaleIn 0.5s ease-out',
    			scaleUp: 'scaleUp 0.3s ease-out',
    			slideInUp: 'slideInUp 0.5s ease-out',
    			slideInDown: 'slideInDown 0.5s ease-out',
    			bounceIn: 'bounceIn 0.8s ease-out',
    			glow: 'glow 2s ease-in-out infinite',
    			'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
    			'gradient-shift': 'gradient-shift 3s ease infinite',
    			float: 'float 3s ease-in-out infinite',
    			shimmer: 'shimmer 2s linear infinite'
    		}
    	}
    },
	plugins: [
		require("tailwindcss-animate")
	],
};
export default config;

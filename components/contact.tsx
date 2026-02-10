"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone } from "lucide-react"
import { toast } from "sonner"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function Contact() {
  const titleAnimation = useScrollAnimation({ threshold: 0.3 })
  const contentAnimation = useScrollAnimation({ threshold: 0.2 })

  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Invalid email", { description: "Please enter a valid email address." })
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        toast.success("Message sent!", {
          description: "Thanks for reaching out. I'll reply soon.",
        })
        setFormData({ name: "", email: "", message: "" })
      } else {
        toast.error("Failed to send", { description: "Please try again later." })
      }
    } catch (err) {
      toast.error("Something went wrong", { description: "Check your connection and try again." })
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div ref={titleAnimation.ref}>
            <h2
              className={`text-3xl sm:text-4xl font-semibold mb-10 transition-all duration-700 ${
                titleAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              Contact
            </h2>
          </div>

          <div
            ref={contentAnimation.ref}
            className={`grid lg:grid-cols-[0.9fr_1.1fr] gap-10 transition-all duration-700 ${
              contentAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="space-y-6">
              <div className="border border-white/10 bg-card/50 rounded-2xl p-6">
                <p className="text-xs font-mono uppercase tracking-[0.4em] text-muted-foreground">Signal</p>
                <h3 className="text-2xl font-semibold mt-4">Let’s design something precise.</h3>
                <p className="text-muted-foreground mt-4">
                  I’m open to collaborations, product builds, and long-term engineering support.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 border border-white/10 bg-card/40 rounded-2xl p-4">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>pradumky803@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3 border border-white/10 bg-card/40 rounded-2xl p-4">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>+91 7209854942</span>
                </div>
                <div className="flex items-center space-x-3 border border-white/10 bg-card/40 rounded-2xl p-4">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Jalandhar, Punjab</span>
                </div>
              </div>
            </div>

            <div className="border border-white/10 bg-card/60 rounded-3xl p-6 lg:p-8">
              <div className="mb-6">
                <p className="text-xs font-mono uppercase tracking-[0.4em] text-muted-foreground">Start</p>
                <h3 className="text-2xl font-semibold mt-3">Send a brief</h3>
                <p className="text-muted-foreground mt-2">Describe the mission, timeline, and constraints.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-background/40 border-white/10 focus:border-primary"
                />
                <Input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-background/40 border-white/10 focus:border-primary"
                />
                <Textarea
                  name="message"
                  placeholder="Your Message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="bg-background/40 border-white/10 focus:border-primary"
                />
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
    e.preventDefault();
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Invalid email", { description: "Please enter a valid email address." })
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Message sent!", {
          description: "Thanks for reaching out. I'll reply soon.",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("Failed to send", { description: "Please try again later." });
      }
    } catch (err) {
      toast.error("Something went wrong", { description: "Check your connection and try again." });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div ref={titleAnimation.ref}>
            <h2 className={`text-3xl sm:text-4xl font-bold text-center mb-12 transition-all duration-700 ${titleAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}>
              Get In Touch
            </h2>
          </div>

          <div ref={contentAnimation.ref} className="grid md:grid-cols-2 gap-12">
            <div className={`transition-all duration-700 ${contentAnimation.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}>
              <h3 className="text-2xl font-semibold mb-6">{"Let's work together"}</h3>
              <p className="text-lg text-muted-foreground mb-8">
                I'm always interested in new opportunities and exciting projects. Whether you have a question or just
                want to say hi, feel free to reach out!
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 transition-all duration-300 hover:translate-x-2 hover:text-primary">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>pradumky803@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3 transition-all duration-300 hover:translate-x-2 hover:text-primary">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>+91 7209854942</span>
                </div>
                <div className="flex items-center space-x-3 transition-all duration-300 hover:translate-x-2 hover:text-primary">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Jalandhar, Punjab</span>
                </div>
              </div>
            </div>

            <Card className={`transition-all duration-700 delay-200 hover:shadow-xl ${contentAnimation.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}>
              <CardHeader>
                <CardTitle>Send me a message</CardTitle>
                <CardDescription>{"I'll get back to you as soon as possible."}</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="transition-all focus:scale-105 focus:shadow-lg focus:shadow-primary/20"
                    />
                  </div>
                  <div>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="transition-all focus:scale-105 focus:shadow-lg focus:shadow-primary/20"
                    />
                  </div>
                  <div>
                    <Textarea
                      name="message"
                      placeholder="Your Message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="transition-all focus:scale-105 focus:shadow-lg focus:shadow-primary/20"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full transition-all hover:scale-105 hover:shadow-lg"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

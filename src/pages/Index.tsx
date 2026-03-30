import { Link } from "react-router-dom";
import { GraduationCap, ShieldCheck } from "lucide-react";
import RegistrationForm from "@/components/RegistrationForm";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-7 w-7 text-primary" />
            <span className="font-heading font-bold text-lg text-foreground">StudentReg</span>
          </div>
          <Link
            to="/admin"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ShieldCheck className="h-4 w-4" />
            Admin
          </Link>
        </div>
      </header>

      {/* Hero + Form */}
      <main className="container py-12 md:py-20">
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
            Student Registration Portal
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Register for your courses quickly and securely. Your data is safe with us.
          </p>
        </div>
        <RegistrationForm />
      </main>
    </div>
  );
}

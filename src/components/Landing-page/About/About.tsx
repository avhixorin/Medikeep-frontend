import { Card } from "@/components/ui/card";

export default function About() {
  return (
    <>
      <section className="relative px-6 py-16 md:py-28">
        {/* Green circle decoration */}
        <div className="absolute left-0 bottom-0 w-32 h-32 bg-green-400 rounded-full opacity-20 -translate-x-1/2 translate-y-1/2" />

        <div className="container mx-auto">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-20">
              <h2 className="text-3xl font-bold sm:text-4xl md:text-6xl leading-tight">
                Building the Bridge Between{" "}
                <span className="text-green-500">Patients</span> and{" "}
                <span className="text-green-500">Doctors</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                At <span className="font-semibold text-gray-800">MediKeep</span>, we bridge the gap between patients and doctors by 
                providing a platform that simplifies communication, organizes 
                medical records, and streamlines healthcare management. Join us 
                in redefining the way healthcare is delivered and experienced.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <img
                src="https://res.cloudinary.com/avhixorin/image/upload/v1737574912/Essential_-_Doctor_clinic_doctor_consultation_doctor_patient_discussion_bbjw4g.png"
                alt="Doctor and patient consultation"
                className="object-cover rounded-lg shadow-lg h-3/4"
              />
            </div>
          </div>
        </div>

        {/* Yellow square decoration */}
        <div className="absolute right-0 top-1/2 w-24 h-24 bg-yellow-200 opacity-20" />
      </section>

      {/* Features Section */}
      <section className="px-6 md:pt-16 md:py-20 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold sm:text-3xl md:text-4xl text-gray-800">
                Why Choose <span className="text-green-500">MediKeep?</span>
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Our platform is designed to empower both patients and doctors, offering features that ensure seamless interaction and effective healthcare delivery.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Multi-language Support */}
              <Card className="rounded-lg shadow-lg p-6 border border-gray-200 bg-white hover:shadow-xl transition-shadow">
                <h4 className="text-xl font-semibold text-gray-800">
                  <span className="text-green-500">Multi-Language Support</span>
                </h4>
                <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                  Seamlessly connect with healthcare professionals worldwide in your preferred language. Breaking language barriers, one consultation at a time.
                </p>
              </Card>

              {/* Real-time Chat and Video Calls */}
              <Card className="rounded-lg shadow-lg p-6 border border-gray-200 bg-white hover:shadow-xl transition-shadow">
                <h4 className="text-xl font-semibold text-gray-800">
                  <span className="text-green-500">Real-Time Chat & Video Calls</span>
                </h4>
                <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                  Connect instantly with doctors through secure chat and video calls. Get professional advice and consultations anytime, anywhere.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function About() {
  return (
    <>
      <section className="relative px-4 py-12 md:py-24">
        {/* Green circle decoration */}
        <div className="absolute left-0 bottom-0 w-32 h-32 bg-green-400 rounded-full opacity-20 -translate-x-1/2 translate-y-1/2" />

        <div className="container mx-auto">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold sm:text-4xl md:text-6xl">
                Building the Bridge Between{" "}
                <span className="text-gray-400">Patients</span> and{" "}
                <span className="text-gray-400"> Doctors</span>
              </h2>
            </div>
            <div className="flex items-center">
              <p className="text-gray-600 text-base px-12">
                At MediKeep, we bridge the gap between patients and doctors by
                providing a platform that simplifies communication, organizes
                medical records, and streamlines healthcare management.
              </p>
            </div>
          </div>
        </div>

        {/* Team Image Section */}
        {/* <div className="mt-12 md:mt-24">
          <div className="relative h-[400px] w-full">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-CgiATKSu4lD2rILUmJ95Rt4QeMj33Q.png"
              alt="Team collaborating in office"
              className="object-cover rounded-lg"
            />
          </div>
        </div> */}

        {/* Yellow square decoration */}
        <div className="absolute right-0 top-1/2 w-24 h-24 bg-yellow-200 opacity-20" />
      </section>

      {/* Together Section */}
      <section className="px-4 py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-4">
              <img src="https://res.cloudinary.com/avhixorin/image/upload/v1737574912/Essential_-_Doctor_clinic_doctor_consultation_doctor_patient_discussion_bbjw4g.png" alt="" className="object-cover rounded-lg"/>
            </div>
            <div className="flex justify-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-center">
                Together we are strong
              </h2>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

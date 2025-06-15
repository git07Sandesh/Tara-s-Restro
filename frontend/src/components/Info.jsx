import { Clock, MapPin, Phone } from 'lucide-react'
import React from 'react'

const Info = () => {
  return (
    <section id="info" className="py-20 bg-white text-amber-500">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 text-center">
          <div className="space-y-4">
            <Clock className="mx-auto" size={40} />
            <h3 className="text-2xl font-bold">Hours</h3>
            <p className="text-lg">
              Mon-Fri: 8am - 10pm<br />
              Sat-Sun: 8am - 11pm
            </p>
          </div>
          <div className="space-y-4">
            <MapPin className="mx-auto" size={40} />
            <h3 className="text-2xl font-bold">Location</h3>
            <p className="text-lg">
              Tokha-03, SundarGaun Pul<br />
              Kathmandu, Nepal
            </p>
          </div>
          <div className="space-y-4">
            <Phone className="mx-auto" size={40} />
            <h3 className="text-2xl font-bold">Contact</h3>
            <p className="text-lg">
              +01 4974874<br />
              tarasrestro@gmail.com
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Info

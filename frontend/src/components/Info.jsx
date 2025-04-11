import { Clock, MapPin, Phone } from 'lucide-react'
import React from 'react'

const Info = () => {
  return (
    <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <Clock className="mx-auto" size={32} />
              <h3 className="text-xl font-semibold">Hours</h3>
              <p className="text-gray-600">
                Mon-Fri: 9am - 10pm<br />
                Sat-Sun: 8am - 11pm
              </p>
            </div>
            <div className="space-y-4">
              <MapPin className="mx-auto" size={32} />
              <h3 className="text-xl font-semibold">Location</h3>
              <p className="text-gray-600">
                Tokha-03<br />
                Kathmandu, Nepal
              </p>
            </div>
            <div className="space-y-4">
              <Phone className="mx-auto" size={32} />
              <h3 className="text-xl font-semibold">Contact</h3>
              <p className="text-gray-600">
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
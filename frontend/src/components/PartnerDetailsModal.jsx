import React from "react";
import Image from "next/image";
import { X } from "lucide-react";

const PartnerDetailsModal = ({ partner, onClose }) => {
  if (!partner) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full relative overflow-y-auto max-h-[90vh] animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 rounded-full p-2 shadow-sm transition"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Partner Header */}
        <div className="flex flex-col items-center text-center p-8 border-b bg-gradient-to-r from-pink-50 to-blue-50">
          <div className="w-28 h-28 relative rounded-full overflow-hidden shadow-md border-2 border-pink-200 mb-4">
            <Image
              src={partner.logo}
              alt={partner.name}
              fill
              className="object-contain p-2"
            />
          </div>
          <h2 className="text-3xl font-bold text-blue-800">{partner.name}</h2>
          <p className="text-gray-600 mt-2 max-w-2xl">{partner.description}</p>
          <a
            href={partner.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block bg-pink-600 text-white px-5 py-2 rounded-full font-medium shadow hover:bg-pink-700 transition"
          >
            Visit Website
          </a>
        </div>

        {/* Program Details */}
        <div className="p-6 space-y-8">
          {partner.programs?.map((program, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
            >
              <div className="bg-gray-50 px-6 py-4 border-b">
                <h3 className="text-xl font-semibold text-green-700">{program.name}</h3>
                <div className="flex flex-wrap gap-6 mt-2 text-sm text-gray-700">
                  <span>
                    <strong>Beneficiaries:</strong> {program.beneficiaries}
                  </span>
                  <span>
                    <strong>Donation:</strong> {program.donation}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <p className="text-gray-600 leading-relaxed">{program.achievements}</p>
                {program.images?.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    {program.images.map((img, i) => (
                      <div key={i} className="relative h-48 rounded-lg overflow-hidden shadow">
                        <Image
                          src={img}
                          alt={`Program image ${i + 1}`}
                          fill
                          className="object-cover hover:scale-105 transition-transform"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartnerDetailsModal;

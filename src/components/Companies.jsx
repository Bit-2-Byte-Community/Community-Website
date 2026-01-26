import React from 'react';

const Companies = () => {
  const companies = [
    {
      id: 1,
      name: 'Juspay',
      image: 'https://media.licdn.com/dms/image/v2/D560BAQGtsY1kDgXExg/company-logo_200_200/company-logo_200_200/0/1720767560345/juspay_technologies_logo?e=2147483647&v=beta&t=PB4AdafL_0zudyjmJjFOjjtW24FfhU2jh0DMU02o9j0'
    },
    {
      id: 2,
      name: 'DeltaX',
      image: 'https://media.licdn.com/dms/image/v2/C4D0BAQGAVnBTjW6Gjw/company-logo_200_200/company-logo_200_200/0/1659696444487/deltax_logo?e=2147483647&v=beta&t=9FsMNOwQCwFp9hu_G8eCWV9w6C5UJZvHxJI2nS4vPq0'
    },
    {
      id: 3,
      name: 'SAP',
      image: 'https://media.licdn.com/dms/image/v2/D560BAQGmwwo0aq4jVA/company-logo_200_200/company-logo_200_200/0/1723034255614/sap_logo?e=1764806400&v=beta&t=HeImKSFzpY6Ek0oxrZ_CIPBMiJQS36bjxg3vLmr_9XE'
    },
    {
      id: 4,
      name: 'Yatri Sathi',
      image: 'https://media.licdn.com/dms/image/v2/D560BAQEPzKBXziayeQ/company-logo_200_200/company-logo_200_200/0/1690525843088/yatri_sathi_logo?e=1764806400&v=beta&t=P9oqg_JU4g_3dBfoaFDQjagmoyFmJU-ngYv8PwnLBYs'
    },
    {
      id: 5,
      name: 'Itobuz',
      image: 'https://media.licdn.com/dms/image/v2/C4D0BAQGbMF7PV0i8-A/company-logo_100_100/company-logo_100_100/0/1630529416954/itobuz_technologies_pvt_ltd_logo?e=1764806400&v=beta&t=yKKZpADom77smrHtuOFNWjFMReNSta5u5-XTWEI5Evo'
    },
    {
      id: 6,
      name: 'OneBanc',
      image: 'https://media.licdn.com/dms/image/v2/D4D0BAQHIZtVi3j234A/company-logo_200_200/company-logo_200_200/0/1688194785195/onebanc_logo?e=1764806400&v=beta&t=_h4SJSyx0aku8ID2oW2ntZAnjks0xkpjbCX3rSlEvjk'
    },
    {
      id: 7,
      name: 'Cognizant',
      image: 'https://media.licdn.com/dms/image/v2/D4E0BAQFZH4svu5BTZA/company-logo_200_200/B4EZk_EfNgHgAM-/0/1757699778309/cognizant_logo?e=1764806400&v=beta&t=jSeT9Xq3GFPg9rx9ARXysU2fGgvB2ZnTDIt0lR_0yC4'
    },
    {
      id: 8,
      name: 'LTI Mindtree',
      image: 'https://media.licdn.com/dms/image/v2/D4D0BAQEBJMQ--lA30w/company-logo_200_200/B4DZiDLzBeGsAM-/0/1754547565112/ltimindtree_logo?e=1764806400&v=beta&t=xjCdrJmKnLzzrMhjWi6sv3SDh-DyF3lRtj74ZEY1Ny4'
    },
    {
      id: 9,
      name: 'Think41',
      image: 'https://media.licdn.com/dms/image/v2/D560BAQE-xza2FNU68Q/company-logo_200_200/company-logo_200_200/0/1738672856597/think41_logo?e=1764806400&v=beta&t=dbpCCrFTMVNCaq1yLTs7gBr8Uueoio_GICtyAo9y2pk'
    },
    {
      id: 10,
      name: 'TCS',
      image: 'https://media.licdn.com/dms/image/v2/D4D0BAQGsGR9p4ikS5w/company-logo_200_200/company-logo_200_200/0/1708946550425/tata_consultancy_services_logo?e=1764806400&v=beta&t=rdOJdG4LtGSlzBiuB-do1NnOR7TR41YuojyKN4y-Caw'
    },
    {
      id: 11,
      name: 'IBM',
      image: 'https://media.licdn.com/dms/image/v2/D560BAQGiz5ecgpCtkA/company-logo_200_200/company-logo_200_200/0/1688684715866/ibm_logo?e=1764806400&v=beta&t=KXM3J_75gnTzpWTbOPTge6XI6bC6_abJ7pY8ZuKL1ps'
    },
    {
      id: 12,
      name: 'Deloitte',
      image: 'https://media.licdn.com/dms/image/v2/C560BAQGNtpblgQpJoQ/company-logo_200_200/company-logo_200_200/0/1662120928214/deloitte_logo?e=1764806400&v=beta&t=tZTYc5LeMc062bku7xdB3aviV7uKcYYtp7G1Yaeepb4'
    },
    {
      id: 13,
      name: 'Poornam',
      image: 'https://media.licdn.com/dms/image/v2/D560BAQE8eN1IQA-L5Q/company-logo_200_200/company-logo_200_200/0/1735025895796/poornam_info_vision_private_limited_logo?e=1764806400&v=beta&t=m3H0THYf4TaghtvdRuL-xOk8bp-BxxY6SGVlWNbPRgA'
    },
    {
      id: 14,
      name: 'Achnet',
      image: 'https://media.licdn.com/dms/image/v2/D560BAQEiDAoijECBIA/company-logo_200_200/company-logo_200_200/0/1732103704177/achnet_logo?e=1764806400&v=beta&t=Byvu7TLQ6gDDnLEkeU6fQIPHiRPYrZZH6evyS4UUpGc'
    },
    {
      id: 15,
      name: 'Twitter',
      image: 'https://media.licdn.com/dms/image/v2/C4D0BAQHiNSL4Or29cg/company-logo_200_200/company-logo_200_200/0/1631311446380?e=2147483647&v=beta&t=example'
    },
    {
      id: 16,
      name: 'Bentley Systems',
      image: 'https://media.licdn.com/dms/image/v2/D4E0BAQHkHC7vnDuBRQ/company-logo_200_200/company-logo_200_200/0/1719493210887/bentley_systems_logo?e=1764806400&v=beta&t=WQcayKhcmGS40Amn49LzlaY6Nidf-e4VwCeeWRLOTH8'
    },
    {
      id: 17,
      name: 'Cyfuture',
      image: 'https://media.licdn.com/dms/image/v2/D560BAQGBnOPoyWwDaw/company-logo_200_200/B56ZUT77vOGoAI-/0/1739796233595/cyfuture_logo?e=1764806400&v=beta&t=uOlWyzS-8rwGMYjZR8Ct2griQUkjGh_zh_YICCsO7eg'
    },
    {
      id: 18,
      name: 'Airbnb',
      image: 'https://media.licdn.com/dms/image/v2/D560BAQFHREQcd0cUaQ/company-logo_200_200/company-logo_200_200/0/1631311446380?e=2147483647&v=beta&t=example'
    },
    {
      id: 19,
      name: 'LinkedIn',
      image: 'https://media.licdn.com/dms/image/v2/C560BAQHdAaarsO-eyA/company-logo_200_200/company-logo_200_200/0/1631311446380?e=2147483647&v=beta&t=example'
    },
    {
      id: 20,
      name: 'Stripe',
      image: 'https://media.licdn.com/dms/image/v2/C560BAQHTvZwCx4p2Qg/company-logo_200_200/company-logo_200_200/0/1631311446380?e=2147483647&v=beta&t=example'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Partner Companies
          </h1>
          <p className="text-gray-300 text-lg">
            Trusted by industry leaders worldwide
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {companies.map((company) => (
            <div
              key={company.id}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 cursor-pointer border border-white/10"
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="w-24 h-24 bg-violet-950 rounded-lg flex items-center justify-center p-2 shadow-lg">
                  <img
                    src={company.image}
                    alt={`${company.name} logo`}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${company.name}&background=random&size=200`;
                    }}
                  />
                </div>
                <h3 className="text-white font-semibold text-center">
                  {company.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Companies;
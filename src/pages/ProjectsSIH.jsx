import React from 'react';
import projectsData from '../../data/hackathon_project_sih.json';

function ProjectsSIH() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-20 gap-6">
          {projectsData.map((project, index) => (
            <div 
              key={index} 
              className="bg-black rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-slate-200"
            >
              <div className="relative h-48 w-full overflow-hidden ">
                <img 
                  src={project.projectCover} 
                  alt={project.projectName}
                  className="w-full h-full object-cover"
                />
                {project.prize && (
                  <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                    🏆 {project.prize}
                  </div>
                )}
                <div className="absolute bottom-3 left-3">
                  <img 
                    src={project.projectLogo} 
                    alt={`${project.projectName} logo`}
                    className="w-16 h-16 rounded-lg shadow-lg border-2 border-white object-cover"
                  />
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h2 className="text-xl font-semibold text-white">
                    {project.projectName}
                  </h2>
                  <a 
                    href={project.githubLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-slate-100 hover:text-slate-500 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-medium text-purple-50 bg-purple-900 px-2 py-1 rounded">
                    {project.hackathon}
                  </span>
                </div>
                
                <p className="text-slate-400 text-sm mb-4">
                  {project.projectDescription}
                </p>
                
                <div className="border-t border-slate-200 pt-4">
                  <h3 className="text-sm font-semibold text-slate-200 mb-2">
                    Team Members ({project.projectMembers.length})
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.projectMembers.map((member, memberIndex) => (
                      <span 
                        key={memberIndex}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-950 text-blue-200"
                      >
                        {member}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectsSIH;
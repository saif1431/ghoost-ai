"use client"

import { Pencil, Plus, Trash2, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import type { ProjectSummary } from "@/components/editor/use-project-dialogs"

interface ProjectSidebarProps {
  isOpen: boolean
  onClose: () => void
  ownedProjects: ProjectSummary[]
  sharedProjects: ProjectSummary[]
  onCreateProject: () => void
  onSelectProject: (project: ProjectSummary) => void
  onRenameProject: (project: ProjectSummary) => void
  onDeleteProject: (project: ProjectSummary) => void
  className?: string
}

export function ProjectSidebar({
  isOpen,
  onClose,
  ownedProjects,
  sharedProjects,
  onCreateProject,
  onRenameProject,
  onDeleteProject,
  className,
}: ProjectSidebarProps) {
  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-30 bg-black/40 backdrop-blur-sm transition-opacity duration-200 sm:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
        aria-hidden={!isOpen}
      />
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-[320px] max-w-[85vw] border-r border-border/70 bg-card/95 shadow-lg backdrop-blur-sm transition-transform duration-200 ease-out",
          isOpen ? "translate-x-0" : "-translate-x-full pointer-events-none",
          className
        )}
        aria-hidden={!isOpen}
      >
        <div className="flex h-full flex-col gap-4 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-medium text-foreground">Projects</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <Tabs defaultValue="my-projects" className="flex flex-1 flex-col">
            <TabsList className="w-full">
              <TabsTrigger value="my-projects" className="flex-1">
                My Projects
              </TabsTrigger>
              <TabsTrigger value="shared" className="flex-1">
                Shared
              </TabsTrigger>
            </TabsList>
            <TabsContent value="my-projects" className="mt-3 flex-1">
              {ownedProjects.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border/70 bg-muted/30 p-4 text-sm text-muted-foreground">
                  No projects yet.
                </div>
              ) : (
                <div className="space-y-2">
                  {ownedProjects.map((project) => (
                    <div
                      key={project.id}
                      className="flex items-center justify-between rounded-xl border border-border/70 bg-background/60 px-3 py-2"
                    >
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-foreground">
                          {project.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {project.slug}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => onRenameProject(project)}
                          aria-label={`Rename ${project.name}`}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => onDeleteProject(project)}
                          aria-label={`Delete ${project.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
            <TabsContent value="shared" className="mt-3 flex-1">
              {sharedProjects.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border/70 bg-muted/30 p-4 text-sm text-muted-foreground">
                  No shared projects yet.
                </div>
              ) : (
                <div className="space-y-2">
                  {sharedProjects.map((project) => (
                    <div
                      key={project.id}
                      className="flex items-center justify-between rounded-xl border border-border/70 bg-background/60 px-3 py-2"
                    >
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-foreground">
                          {project.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {project.slug}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Collaborator
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>

          <Button className="w-full" onClick={onCreateProject}>
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>
      </aside>
    </>
  )
}

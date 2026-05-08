"use client"

import * as React from "react"

import { EditorNavbar } from "@/components/editor/editor-navbar"
import { ProjectSidebar } from "@/components/editor/project-sidebar"
import { ProjectDialogs } from "@/components/editor/project-dialogs"
import { useProjectDialogs } from "@/components/editor/use-project-dialogs"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function EditorPage() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)
  const {
    ownedProjects,
    sharedProjects,
    activeDialog,
    activeProject,
    createName,
    renameName,
    slugPreview,
    isSubmitting,
    setCreateName,
    setRenameName,
    openCreateDialog,
    openRenameDialog,
    openDeleteDialog,
    closeDialog,
    handleCreateSubmit,
    handleRenameSubmit,
    handleDeleteConfirm,
  } = useProjectDialogs()

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <EditorNavbar
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
      />
      <main className="relative flex flex-1 items-stretch">
        <ProjectSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          ownedProjects={ownedProjects}
          onSelectProject={() => {
            // Handle project selection logic here
          }}
          sharedProjects={sharedProjects}
          onCreateProject={openCreateDialog}
          onRenameProject={openRenameDialog}
          onDeleteProject={openDeleteDialog}
        />
        <div className="flex flex-1 items-center justify-center p-6">
          <div className="mx-auto max-w-md space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold text-foreground">
                Create a project or open an existing one
              </h1>
              <p className="text-sm text-muted-foreground">
                Start a new architecture workspace, or choose a project from the
                sidebar.
              </p>
            </div>
            <Button onClick={openCreateDialog}>
              <Plus className="h-4 w-4" />
              New Project
            </Button>
          </div>
        </div>
        <ProjectDialogs
          activeDialog={activeDialog}
          activeProject={activeProject}
          createName={createName}
          renameName={renameName}
          slugPreview={slugPreview}
          isSubmitting={isSubmitting}
          onCreateNameChange={setCreateName}
          onRenameNameChange={setRenameName}
          onClose={closeDialog}
          onCreateSubmit={handleCreateSubmit}
          onRenameSubmit={handleRenameSubmit}
          onDeleteConfirm={handleDeleteConfirm}
        />
      </main>
    </div>
  )
}

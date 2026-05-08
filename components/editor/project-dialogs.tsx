"use client"

import * as React from "react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { ProjectDialogType, ProjectSummary } from "@/components/editor/use-project-dialogs"

interface ProjectDialogsProps {
  activeDialog: ProjectDialogType
  activeProject: ProjectSummary | null
  createName: string
  renameName: string
  slugPreview: string
  isSubmitting: boolean
  onCreateNameChange: (value: string) => void
  onRenameNameChange: (value: string) => void
  onClose: () => void
  onCreateSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  onRenameSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  onDeleteConfirm: () => void
}

export function ProjectDialogs({
  activeDialog,
  activeProject,
  createName,
  renameName,
  slugPreview,
  isSubmitting,
  onCreateNameChange,
  onRenameNameChange,
  onClose,
  onCreateSubmit,
  onRenameSubmit,
  onDeleteConfirm,
}: ProjectDialogsProps) {
  return (
    <>
      <Dialog
        open={activeDialog === "create"}
        onOpenChange={(open) => {
          if (!open) {
            onClose()
          }
        }}
      >
        <DialogContent className="rounded-3xl border border-border/70 bg-card">
          <form onSubmit={onCreateSubmit} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Create project</DialogTitle>
              <DialogDescription>
                Start a new architecture workspace for your team.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-2">
              <label
                htmlFor="create-project-name"
                className="text-xs font-medium text-muted-foreground"
              >
                Project name
              </label>
              <Input
                id="create-project-name"
                placeholder="E.g. Real-time observability"
                value={createName}
                onChange={(event) => onCreateNameChange(event.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Slug: <span className="text-foreground">{slugPreview}</span>
              </p>
            </div>
            <DialogFooter className="sm:items-center">
              <Button
                type="submit"
                disabled={!createName.trim() || isSubmitting}
              >
                {isSubmitting ? "Creating..." : "Create project"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={activeDialog === "rename"}
        onOpenChange={(open) => {
          if (!open) {
            onClose()
          }
        }}
      >
        <DialogContent className="rounded-3xl border border-border/70 bg-card">
          <form onSubmit={onRenameSubmit} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Rename project</DialogTitle>
              <DialogDescription>
                Current name: {activeProject?.name ?? "Untitled project"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-2">
              <label
                htmlFor="rename-project-name"
                className="text-xs font-medium text-muted-foreground"
              >
                Project name
              </label>
              <Input
                id="rename-project-name"
                value={renameName}
                onChange={(event) => onRenameNameChange(event.target.value)}
                autoFocus
              />
            </div>
            <DialogFooter className="sm:items-center">
              <Button
                type="submit"
                disabled={!renameName.trim() || isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={activeDialog === "delete"}
        onOpenChange={(open) => {
          if (!open) {
            onClose()
          }
        }}
      >
        <DialogContent className="rounded-3xl border border-border/70 bg-card">
          <DialogHeader>
            <DialogTitle>Delete project</DialogTitle>
            <DialogDescription>
              This action is permanent and cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:items-center">
            <Button
              type="button"
              variant="destructive"
              onClick={onDeleteConfirm}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Deleting..." : "Delete project"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

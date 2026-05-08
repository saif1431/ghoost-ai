"use client"

import * as React from "react"

export type ProjectOwnership = "owner" | "collaborator"

export interface ProjectSummary {
  id: string
  name: string
  slug: string
  ownership: ProjectOwnership
}

export type ProjectDialogType = "create" | "rename" | "delete" | null

const ownedProjects: ProjectSummary[] = [
  {
    id: "project-aurora",
    name: "Aurora Observability",
    slug: "aurora-observability",
    ownership: "owner",
  },
  {
    id: "project-strata",
    name: "Strata Sync",
    slug: "strata-sync",
    ownership: "owner",
  },
]

const sharedProjects: ProjectSummary[] = [
  {
    id: "project-lattice",
    name: "Lattice Ingest",
    slug: "lattice-ingest",
    ownership: "collaborator",
  },
]

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "")
}

export function useProjectDialogs() {
  const [activeDialog, setActiveDialog] = React.useState<ProjectDialogType>(
    null
  )
  const [activeProjectId, setActiveProjectId] =
    React.useState<string | null>(null)
  const [createName, setCreateName] = React.useState("")
  const [renameName, setRenameName] = React.useState("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const allProjects = React.useMemo(
    () => [...ownedProjects, ...sharedProjects],
    []
  )

  const activeProject = React.useMemo(() => {
    if (!activeProjectId) {
      return null
    }
    return allProjects.find((project) => project.id === activeProjectId) ?? null
  }, [activeProjectId, allProjects])

  const slugPreview = React.useMemo(() => {
    const slug = slugify(createName)
    return slug.length > 0 ? slug : "project-slug"
  }, [createName])

  const closeDialog = React.useCallback(() => {
    setActiveDialog(null)
    setIsSubmitting(false)
  }, [])

  const openCreateDialog = React.useCallback(() => {
    setActiveDialog("create")
    setActiveProjectId(null)
    setCreateName("")
  }, [])

  const openRenameDialog = React.useCallback((project: ProjectSummary) => {
    setActiveDialog("rename")
    setActiveProjectId(project.id)
    setRenameName(project.name)
  }, [])

  const openDeleteDialog = React.useCallback((project: ProjectSummary) => {
    setActiveDialog("delete")
    setActiveProjectId(project.id)
  }, [])

  const handleCreateSubmit = React.useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      if (!createName.trim()) {
        return
      }
      setIsSubmitting(true)
      try {
        // await createProject({ name: createName, slug: slugify(createName) })
        closeDialog()
      } catch (error) {
        // handle error
      } finally {
        setIsSubmitting(false)
      }
    },
    [closeDialog, createName]
  )

  const handleRenameSubmit = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      if (!renameName.trim()) {
        return
      }
      setIsSubmitting(true)
      setIsSubmitting(false)
      closeDialog()
    },
    [closeDialog, renameName]
  )

  const handleDeleteConfirm = React.useCallback(() => {
    setIsSubmitting(true)
    setIsSubmitting(false)
    closeDialog()
  }, [closeDialog])
  return {
    ownedProjects,
    sharedProjects,
    activeDialog,
    activeProject,
    createName,
    renameName,
    isSubmitting,
    slugPreview,
    setCreateName,
    setRenameName,
    openCreateDialog,
    openRenameDialog,
    openDeleteDialog,
    closeDialog,
    handleCreateSubmit,
    handleRenameSubmit,
    handleDeleteConfirm,
  }
}

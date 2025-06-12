// Utilities
import { defineStore } from 'pinia'
import type {Workorder} from "@/services/sqlite.ts";

const workorders: any[] = [
  // 1. In Progress Workorder
  {
    id: 1,
    assignee: "John Doe",
    Items: [
      { name: "Syringe", Found: 12, Required: 15 }, // Found < Required => var(--main-primary)
      { name: "Gauze", Found: 5, Required: 5 },    // Found === Required => var(--main-action-good)
      { name: "Dover", Found: 8, Required: 6 },    // Found > Required => var(--main-action-error)
      { name: "Coloplast", Found: 0, Required: 0 }, // Found === 0 && Required === 0 => grey
      { name: "Pad", Found: 9, Required: 10 },     // Found < Required => var(--main-primary)
    ],
    WorkorderNumber: "WO-001",
    status: "In Progress", // Should use `var(--main-primary)`
  },
  // 2. Completed Workorder
  {
    id: 2,
    assignee: "Jane Smith",
    Items: [
      { name: "Syringe", Found: 10, Required: 10 }, // Found === Required => var(--main-action-good)
      { name: "Gauze", Found: 6, Required: 6 },     // Found === Required => var(--main-action-good)
      { name: "Dover", Found: 10, Required: 10 },   // Found > Required => var(--main-action-error)
      { name: "Coloplast", Found: 7, Required: 7 }, // Found === Required => var(--main-action-good)
      { name: "Pad", Found: 12, Required: 12 },     // Found > Required => var(--main-action-error)
    ],
    WorkorderNumber: "WO-002",
    status: "Completed", // Should use `var(--main-action-good)`
  },
  // 3. Pending Workorder
  {
    id: 3,
    assignee: "Alice Johnson",
    Items: [
      { name: "Syringe", Found: 0, Required: 15 },  // Found < Required => var(--main-primary)
      { name: "Gauze", Found: 0, Required: 0 },     // Found === 0 && Required === 0 => grey
      { name: "Dover", Found: 10, Required: 14 },   // Found < Required => var(--main-primary)
      { name: "Coloplast", Found: 15, Required: 10 }, // Found > Required => var(--main-action-error)
      { name: "Pad", Found: 8, Required: 8 },       // Found === Required => var(--main-action-good)
    ],
    WorkorderNumber: "WO-003",
    status: "Pending", // Should use `grey`
  },
  // 4. Workorder with Undefined Status
  {
    id: 4,
    assignee: "Mike Lee",
    Items: [
      { name: "Syringe", Found: 20, Required: 10 }, // Found > Required => var(--main-action-error)
      { name: "Gauze", Found: 10, Required: 10 },   // Found === Required => var(--main-action-good)
      { name: "Dover", Found: 0, Required: 0 },     // Found === 0 && Required === 0 => grey
      { name: "Coloplast", Found: 5, Required: 8 }, // Found < Required => var(--main-primary)
      { name: "Pad", Found: 3, Required: 6 },       // Found < Required => var(--main-primary)
    ],
    WorkorderNumber: "WO-004",
    status: "Error", // Should default to `var(--main-action-error)`
  },
];

export const useAppStore = defineStore('app', {
  state: () => ({
    isModalShow: false,
    workorders: workorders,
  }),
})

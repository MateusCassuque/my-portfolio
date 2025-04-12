#!/bin/bash
bun install
bunx prisma generate
bun run build
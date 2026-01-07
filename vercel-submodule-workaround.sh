#!/usr/bin/env bash
set -euo pipefail

echo "[vercel-submodule-workaround] Starting..."

if [[ -z "${GITHUB_ACCESS_TOKEN:-}" ]]; then
  echo "[vercel-submodule-workaround] ERROR: GITHUB_ACCESS_TOKEN is not set."
  echo "Add it in Vercel → Project Settings → Environment Variables."
  exit 1
fi

# Configure your submodule repo details here
SUBMODULE_PATH="content"
SUBMODULE_OWNER="Jared00m"
SUBMODULE_REPO="dios-habla-content"
REMOTE_URL="https://${GITHUB_ACCESS_TOKEN}@github.com/${SUBMODULE_OWNER}/${SUBMODULE_REPO}.git"

echo "[vercel-submodule-workaround] Target submodule: ${SUBMODULE_PATH} -> ${REMOTE_URL}"

# Determine the desired commit of the submodule recorded in the parent repo
DESIRED_COMMIT=""
if git rev-parse HEAD >/dev/null 2>&1; then
  # Use git ls-tree to read the gitlink commit for the submodule at HEAD
  DESIRED_COMMIT=$(git ls-tree HEAD "${SUBMODULE_PATH}" | awk '{print $3}') || true
fi

if [[ -z "${DESIRED_COMMIT}" ]]; then
  echo "[vercel-submodule-workaround] WARN: Could not determine desired commit. Will use 'main'."
fi

# If the directory exists, ensure it's a git repo and set remote; otherwise clone fresh
if [[ -d "${SUBMODULE_PATH}" && -d "${SUBMODULE_PATH}/.git" ]]; then
  echo "[vercel-submodule-workaround] Existing repo detected. Updating remote and fetching..."
  git -C "${SUBMODULE_PATH}" remote set-url origin "${REMOTE_URL}"
  git -C "${SUBMODULE_PATH}" fetch origin --tags --prune
else
  echo "[vercel-submodule-workaround] Cloning submodule..."
  rm -rf "${SUBMODULE_PATH}"
  git clone "${REMOTE_URL}" "${SUBMODULE_PATH}"
fi

# Checkout the desired commit or fall back to main
if [[ -n "${DESIRED_COMMIT}" ]]; then
  echo "[vercel-submodule-workaround] Checking out desired commit ${DESIRED_COMMIT}..."
  # Try to fetch the exact commit (in case it's not on a named ref)
  git -C "${SUBMODULE_PATH}" fetch origin "${DESIRED_COMMIT}" || true
  if git -C "${SUBMODULE_PATH}" cat-file -e "${DESIRED_COMMIT}^{commit}" 2>/dev/null; then
    git -C "${SUBMODULE_PATH}" checkout --detach "${DESIRED_COMMIT}"
  else
    echo "[vercel-submodule-workaround] WARN: Commit not found on remote; falling back to 'main'"
    git -C "${SUBMODULE_PATH}" checkout main
    git -C "${SUBMODULE_PATH}" pull --ff-only origin main
  fi
else
  echo "[vercel-submodule-workaround] Using branch 'main'..."
  git -C "${SUBMODULE_PATH}" checkout main
  git -C "${SUBMODULE_PATH}" pull --ff-only origin main
fi

echo "[vercel-submodule-workaround] Submodule HEAD -> $(git -C "${SUBMODULE_PATH}" rev-parse HEAD)"
echo "[vercel-submodule-workaround] Done."

#! /usr/bin/env sh

main() {
  if [[ $# -eq 1 ]] || [[ $# -gt 2 ]]; then 
    echo -e "\x1b[1m[\x1b[31mError\x1b[39m]\x1b[0m invalid arguments, aborting"
    exit 1
  fi

  remixProjectDir=$1
  if ! [[ -f "${remixProjectDir}/remix.config.js"]]; then
    echo -e "\x1b[1m[\x1b[31mError\x1b[39m]\x1b[0m the project does not look like a Remix project, aborting"
    exit 1
  fi
}

main $@
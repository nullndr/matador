#! /usr/bin/env sh

installMantine() {

  if grep -e "@mantine/core" package.json > /dev/null 2>&1; then
    return
  fi

  echo -e "\x1b[1m[ ℹ️  ] Matador needs the \x1b[36m@mantine/core\x1b[39m package, the script is gonna install it\x1b[0m"
  local remixRootDir=$1
  local currentDir=$(pwd)
  cd $remixRootDir

  local hasMantineBeenInstalled=0
  if [[ -f "package.json" ]]; then
    if ! npm --version > /dev/null 2>&1; then
      echo -e "\x1b[1m[ \x1b[31mError\x1b[39m ] I can't run \x1b[36mnpm\x1b[39m\x1b[0m"
      exit 1
    else
      echo -e "\x1b[1m[ ℹ️  ] installing \x1b[36m@mantine/core\x1b[39m package with npm\x1b[0m"
      npm install @mantine/core
      
      if [[ $? -ne 0 ]]; then
        echo -e -n "\x1b[1m[ ❌ ] something went wrong while installing the package, aborting\x1b[0m "
        exit 1
      fi

      hasMantineBeenInstalled=1
    fi

    if [[ $hasMantineBeenInstalled -eq 0 ]]; then
      if ! yarn --version > /dev/null 2>&1; then
        echo -e "\x1b[1m[ \x1b[31mError\x1b[39m ] I can't run \x1b[36myarn\x1b[39m\x1b[0m"
        exit 1
      else
        echo -e "\x1b[1m[ ℹ️  ] installing \x1b[36m@mantine/core\x1b[39m package with yarn\x1b[0m"
        yarn add @mantine/core

        if [[ $? -ne 0 ]]; then
          echo -e -n "\x1b[1m[ ❌ ] something went wrong while installing the package, aborting\x1b[0m "
          exit 1
        fi

        hasMantineBeenInstalled=1
      fi
    fi

    if [[ $hasMantineBeenInstalled -eq 0 ]]; then
      echo -e "\x1b[1m[ \x1b[31mError\x1b[39m ] I can't install \x1b[36mMantine\x1b[39m package\x1b[0m"
      echo -e -n "\x1b[1m[ ❌ ] aborting \x1b[36mMatador\x1b[39m installation for the above reasons\x1b[0m "
      exit 1
    fi
  else
    echo -e "\x1b[1m[ \x1b[31mError\x1b[39m ] I can't found \x1b[36mpackage.json\x1b[39m file\x1b[0m"
    echo -e -n "\x1b[1m[ ❌ ] aborting \x1b[36mMatador\x1b[39m installation for the above reasons\x1b[0m "
    exit 1
  fi


  cd $currentDir

  echo 
  echo -e "\x1b[1m[ ℹ️  ] I successfully installed the \x1b[36m@mantine/core\x1b[39m package\x1b[0m"
}

checkRemixDir() {
  local remixRootDir=$(realpath $1)
  if ! [[ -f "${remixRootDir}/remix.config.js" ]]; then
    echo -e "\x1b[1m[ \x1b[31mError\x1b[39m ] the \x1b[36m$remixRootDir\x1b[39m directory does not look like a Remix project, aborting\x1b[0k"
    echo -e -n "\x1b[1m[ ❌ ] aborting \x1b[36mMatador\x1b[39m installation for the above reasons\x1b[0m "
    exit 1
  fi
  echo $remixRootDir
}

checkAppDir() {
  local isError=0
  local remixAppDir=$1
  if [[ ! -d "$remixAppDir" ]]; then
    echo -e "\x1b[1m[ \x1b[31mError\x1b[39m ] directory \x1b[36m$remixAppDir\x1b[39m not found\x1b[0m"
    isError=1
  fi

  if [[ -f "$remixAppDir/routes/matador.tsx" ]]; then
    echo -e "\x1b[1m[ \x1b[31mError\x1b[39m ] file \x1b[36m$remixAppDir/routes/matador.tsx\x1b[39m already exists\x1b[0m"
    isError=1
  fi

  if [[ -d "$remixAppDir/routes/matador" ]]; then
    echo -e "\x1b[1m[ \x1b[31mError\x1b[39m ] directory \x1b[36m$remixAppDir/routes/matador\x1b[39m already exists\x1b[0m"
    isError=1
  fi

  if [[ -d "$remixAppDir/lib/matador" ]]; then
    echo -e "\x1b[1m[ \x1b[31mError\x1b[39m ] directory \x1b[36m$remixAppDir/lib/matador\x1b[39m already exists\x1b[0m"
    isError=1
  fi

  if [[ isError -eq 1 ]]; then
    echo -e -n "\x1b[1m[ ❌ ] aborting \x1b[36mMatador\x1b[39m installation for the above reasons\x1b[0m "
    exit 1
  fi
}

main() {
  if [[ $# -gt 2 ]]; then 
    echo -e "\x1b[1m[ \x1b[31mError\x1b[39m ] invalid arguments, aborting\x1b[0m"
    exit 1
  fi

  local remixRootDir=$(checkRemixDir $1)
  local remixAppDir=$(realpath "$1/$([[ $2 != "" ]] && echo $2 || echo "app")")
  checkAppDir $remixAppDir

  installMantine $remixRootDir

  local tempDir="/tmp/matador-$(uuidgen -t)"

  mkdir $tempDir

  echo -e "\x1b[1m[ ℹ️  ] Downloading \x1b[36mMatador\x1b[39m from repo\x1b[0m"
  wget -q https://github.com/nullndr/Matador/archive/refs/heads/main.zip -O "$tempDir/main.zip" 2>&1 > /dev/null 

  if [[ $? -ne 0 ]]; then
    echo -e "\x1b[1m[ \x1b[31mError\x1b[39m ] wget failed to download the repo\x1b[0m"
    [[ -f main.zip ]]  && rm "$tempDir/main.zip" && rm -rf $tempDir 
    exit 1
  fi

  echo -e "\x1b[1m[ ℹ️  ] Extracting \x1b[36mMatador\x1b[39m from repo\x1b[0m"

  local libDir="$remixAppDir/lib"
  if ! [[ -d $libDir ]]; then 
    mkdir $libDir
  fi

  unzip -q "$tempDir/main.zip" "Matador-main/*" -d "$tempDir"

  cp -r "$tempDir/Matador-main/app/lib/matador" $libDir

  cp -r "$tempDir/Matador-main/app/routes/matador" "$remixAppDir/routes"

  cp "$tempDir/Matador-main/app/routes/matador.tsx" "$remixAppDir/routes"

  if ! [[ -d "$remixRootDir/public/assets" ]]; then
    mkdir "$remixRootDir/public/assets"
  fi

  cp "$tempDir/Matador-main/public/assets/matador.png" "$remixRootDir/public/assets"

  rm -rf "$tempDir/Matador-main"

  rm "$tempDir/main.zip"

  rm -rf $tempDir

  echo -e "\x1b[1m[ ✅ ] All done! Enjoy \x1b[36mMatador\x1b[39m!\x1b[0m"
}

echo
main $@
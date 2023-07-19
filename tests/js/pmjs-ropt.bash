#! /bin/bash
#
# @file         pmjs-ropt.bash
#               A peter-jr test which ensures that the pmjs -r loads a module by the identifier
#
# @author       Wes Garland, wes@distributive.network
# @date         July 2023

set -u
set -o pipefail

panic()
{
  echo "FAIL: $*" >&2
  exit 2
}

cd `dirname "$0"` || panic "could not change to test directory"

"${PMJS:-pmjs}" -r ./modules/print-load < /dev/null |\
while read keyword rest
do
  case "$keyword" in
    "LOADED")
      echo "${keyword} ${rest}"
      echo "Done"
      exit 111
      ;;
    *)
      echo "Ignored: ${keyword} ${rest}"
      ;;
  esac
done

exitCode="$?"
[ "$exitCode" = "111" ] && exit 0
[ "$exitCode" = "2" ] && exit 2

panic "Test did not run to completion"

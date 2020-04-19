rm -rf tmp
mkdir tmp

declare -a files=("lib" "package.json")

for i in "${files[@]}"
do
  echo "Copying $i"
  cp -r $i tmp
done

cd tmp
npm link

rm -rf tmp
mkdir tmp

declare -a files=("lib" "package.json")

# Copy files into temporary directory
for i in "${files[@]}"
do
  echo "Copying $i"
  cp -r $i tmp
done

cd tmp

# Create local symbolic link
npm link

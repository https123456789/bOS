# Build curors
files=("basic")
for f in ${files[*]}
do
	cp src/res/mouse/$f.svgsource src/res/mouse/$f.svg
done

#Build icons
files=("power" "defaultActionIcon")
for f in ${files[*]}
do
	cp src/res/icons/$f.svgsource src/res/icons/$f.svg
done
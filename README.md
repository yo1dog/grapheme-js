## NPM Viewers: View this on [GitHub](https://github.com/yo1dog/graphemejs#readme), instead. It looks much better.


<br />
# Grapheme JS
Grapheme clustering for JavaScript with [Unicode Standard Annex #29](http://www.unicode.org/reports/tr29/) compliance and some custom emoji enhancements.


<br />
## Usage Example

```javascript
var graphemejs = require('graphemejs').useCustomClustering();

// Ensures that the given string does not contain more than the given max number of visible
// characters.
function assertMaxCharLength(str, maxLength) {
  var graphemeClusters = graphemejs.extract(str);
  
  if (graphemeClusters.length > maxLength) {
    throw new Error('String contains too many characters.');
  }
}
```

<br />
## TOC
- [Concepts](#concepts)
- [Clustering Variants](#clustering-variants)

<span></span>

- [graphemejs](#graphemejs)
  - [`extract`](#extract)
  - [`useLegacyClustering`](#uselegacyclustering)
  - [`useCustomClustering`](#usecustomclustering)
  - [Properties](#properties)

<span></span>

- [String Util](#string-util)
  - [`extractGraphemeClusters`](#extractgraphemeclusters)
  - [`buildStringFromGraphemeClusters`](#buildstringfromgraphemeclusters)
  - [`sliceGraphemeClusters`](#slicegraphemeclusters)

<span></span>

- [Debug Util](#debug-util)
  - [`getStringInfo`](#getstringinfo)
  - [`getGraphemeClustersInfo`](#getgraphemeclustersinfo)

<span></span>

- [Code Point Util](#code-point-util)
  - [`encode`](#encode)
  - [`decode`](#decode)
  - [`isOfType`](#isoftype)
  - [`isTypeValid`](#istypevalid)
  - [Properties](#properties-1)

<span></span>

- [Grapheme Cluster Util](#grapheme-cluster-util)
  - [`extract`](#extract-1)
  - [`applyCustomClustering`](#applycustomclustering)
  - [`isBoundry`](#isboundry)
  - [`shouldBeCustomBoundry`](#shouldbecustomboundry)

<span></span>

- [Surrogate Pair Util](#surrogate-pair-util)
  - [`encode`](#encode-1)
  - [`decode`](#decode-1)
  - [`isSurrogatePair`](#issurrogatepair)
  - [`shouldBeEncoded`](#shouldbeencoded)


<span></span>

- [Defaults](#defaults)
  - [Properties](#properties-2)



<br />

--------------------

<br />



# Concepts
Coming soon...



<br />

--------------------

<br />



# Clustering Variants
Coming soon...



<br />

--------------------

<br />



# graphemejs
```javascript
var graphemejs = require('graphemejs');
```

The main library. Provides access to the utils and some convenience functions.


<br />
### extract
```
graphemejs.extract(str, [useLegacyClustering, [useCustomClustering]])
```

Alias of [`stringUtil.extractGraphemeClusters`](#extractgraphemeclusters).


<br />
### useLegacyClustering
```
graphemejs.useLegacyClustering()
```

Sets [`defaults.useLegacyClustering`](#defaults-uselegacyclustering) to `true` (see [Defaults](#defaults)).

Returns [`graphemejs`](#graphemejs) so it can be chained and used on the require line like so:
```javascript
var graphemejs = require('graphemejs').useLegacyClustering();
```


<br />
### useCustomClustering
```
graphemejs.useCustomClustering()
```

Sets [`defaults.useCustomClustering`](#defaults-usecustomclustering) to `true` (see [Defaults](#defaults)).

Returns [`graphemejs`](#graphemejs) so it can be chained and used on the require line like so:
```javascript
var graphemejs = require('graphemejs').useCustomClustering();
```


<br />
### Properties

Name                             | Description
---------------------------------|------------
`graphemejs.stringUtil`          | The [String Util](#string-util).
`graphemejs.debugUtil`           | The [Debug Util](#debug-util).
`graphemejs.codePointUtil`       | The [Code Point Util](#code-point-util).
`graphemejs.graphemeClusterUtil` | The [Grapheme Cluster Util](#grapheme-cluster-util).
`graphemejs.surrogatePairUtil`   | The [Surrogate Pair Util](#surrogate-pair-util).
`graphemejs.defaults`            | The [Defaults](#defaults).



<br />

--------------------

<br />



# String Util
```javascript
var stringUtil = graphemejs.stringUtil;
```

Provides functions for interfacing with strings. These functions can be used to interface with strings on the grapheme cluster level rather than on the code unit (character) level.


<br />
### extractGraphemeClusters
```
stringUtil.extractGraphemeClusters(str, [useLegacyClustering, [useCustomClustering]])
```

Parameter             | Type    | Description
----------------------|---------|------------
str                 | string  | The string to extract grapheme clusters from.
useLegacyClustering | boolean | **Optional** - If legacy (`true`) or extended (`false`) grapheme clusters should be used (see [Clustering Variants](#clustering-variants)). Defaults to `defaults.useLegacyClustering` (see [Defaults](#defaults)).
useCustomClustering | boolean | **Optional** - If custom clustering should be applied to the grapheme clusters (`true`) or not (`false`) (see [Clustering Variants](#clustering-variants)). Defaults to `defaults.useCustomClustering`  (see [Defaults](#defaults)).

Decodes the given string into code points and groups them into grapheme clusters.

Returns `int[][]` an array of grapheme clusters extracted from the given string.


<br />
### buildStringFromGraphemeClusters
```
stringUtil.buildStringFromGraphemeClusters(graphemeClusters)
```

Parameter        | Type    | Description
-----------------|---------|------------
graphemeClusters | int[][] | Grapheme clusters to create a string from.

Encodes all the code points from the given grapheme clusters into a string.

Returns `string` a string built from the given grapheme clusters.


<br />
### sliceGraphemeClusters
```
stringUtil.sliceGraphemeClusters(str, [start, [end, [useLegacyClustering, [useCustomClustering]]]])
```

Parameter           | Type    | Description
--------------------|---------|------------
str                 | string  | String to slice.
start               | int     | **Optional** - Where to start slicing from. This is passed as the first paramter to the `Array.slice` function called on the extracted grapheme clusters.
end                 | int     | **Optional** - Where to stop slicing at. This is passed as the second paramter to the `Array.slice` function called on the extracted grapheme clusters.
useLegacyClustering | boolean | **Optional** - If legacy (`true`) or extended (`false`) grapheme clusters should be used (see [Clustering Variants](#clustering-variants)). Defaults to [`defaults.useLegacyClustering`](#defaults-uselegacyclustering) (see [Defaults](#defaults)).
useCustomClustering | boolean | **Optional** - If custom clustering should be applied to the grapheme clusters (`true`) or not (`false`) (see [Clustering Variants](#clustering-variants)). Defaults to [`defaults.useCustomClustering`](#defaults-usecustomclustering)  (see [Defaults](#defaults)).

Slices the given string by grapheme clusters instead of by characters. It does this by extracting grapheme clusters from the given string, slicing them via the `Array.slice` function, and then building them back into a string.

**NOTE:** This function uses the `Array.slice` function internally, and not the `String.slice` function. Therefore, this function should not be expected to behave exactly the same as the `String.slice`, `String.substr`, nor `String.substring` functions. Refer to your documentation for the `Array.slice` function for expected behavior.

Returns `string` a string sliced based on its grapheme clusters.

```javascript
var graphemejs = require('graphemejs').useCustomClustering();
var stringUtil = graphemejs.stringUtil;

// Truncates the given string if it has more than the given max number of grapheme clusters
function trancateStr(str, maxLength) {
  return stringUtil.sliceGraphemeClusters(str, 0, maxLength);
}
```



<br />

--------------------

<br />



# Debug Util
```javascript
var debugUtil = graphemejs.debugUtil;
```

Provides functions for debugging strings and grapheme clusters. These functions can be used to get detailed, readable information about the content of strings and grapheme clusters.


<br />
### getStringInfo
```
debugUtil.getStringInfo(str, [useLegacyClustering, [useCustomClustering]])
```

Parameter           | Type    | Description
--------------------|---------|------------
str                 | string  | String to get debug information about.
useLegacyClustering | boolean | **Optional** - If legacy (`true`) or extended (`false`) grapheme clusters should be used (see [Clustering Variants](#clustering-variants)). Defaults to [`defaults.useLegacyClustering`](#defaults-uselegacyclustering) (see [Defaults](#defaults)).
useCustomClustering | boolean | **Optional** - If custom clustering should be applied to the grapheme clusters (`true`) or not (`false`) (see [Clustering Variants](#clustering-variants)). Defaults to [`defaults.useCustomClustering`](#defaults-usecustomclustering) (see [Defaults](#defaults)).

Extracts grapheme clusters from the given string and returns a string containing readable debug information about them.

Returns `string` a string containing debug information about the grapheme clusters in the given string.

```javascript
var graphemejs = require('graphemejs').useCustomClustering();
var debugUtil = graphemejs.debugUtil;

var str = 'hey \uD83D\uDC71\uD83C\uDFFF you';
console.log(debugUtil.getStringInfo(str));
```

Console Output:
<pre>
<code>String:
Length: 12

hey <img src="http://emojipedia-us.s3.amazonaws.com/cache/5f/eb/5feb45b738251034fa2849623a768dd0.png" height="15" /> you

--------------
Code Points:
Num: 10

U+68
U+65
U+79
U+20
U+1F471 (0xD83D, 0xDC71)
U+1F3FF (0xD83C, 0xDFFF)
U+20
U+79
U+6F
U+75

--------------
Grapheme Clusters
Num: 9

0:    h     U+68
1:    e     U+65
2:    y     U+79
3:          U+20
4:    <img src="http://emojipedia-us.s3.amazonaws.com/cache/5f/eb/5feb45b738251034fa2849623a768dd0.png" height="15" />     U+1F471 U+1F3FF
5:          U+20
6:    y     U+79
7:    o     U+6F
8:    u     U+75</code>
</pre>



<br />
### getGraphemeClustersInfo
```
debugUtil.getGraphemeClustersInfo(graphemeClusters)
```

Parameter        | Type    | Description
-----------------|---------|------------
graphemeClusters | int[][] | Grapheme clusters to get debug information about.

Buidls a string containing readable debug information about the given grapheme clusters.

Returns `string` a string containing debug information about the given grapheme clusters.

```javascript
var graphemejs = require('graphemejs').useCustomClustering();
var debugUtil = graphemejs.debugUtil;

var str = 'hey \uD83D\uDC71\uD83C\uDFFF you';
var graphemeClusters = g.extract(str);

console.log('str: ', str);
console.log(debugUtil.getGraphemeClustersInfo(str));
```

Console Output:
<pre>
<code>str: hey <img src="http://emojipedia-us.s3.amazonaws.com/cache/5f/eb/5feb45b738251034fa2849623a768dd0.png" height="15" /> you
Num: 9

0:    h     U+68
1:    e     U+65
2:    y     U+79
3:          U+20
4:    <img src="http://emojipedia-us.s3.amazonaws.com/cache/5f/eb/5feb45b738251034fa2849623a768dd0.png" height="15" />     U+1F471 U+1F3FF
5:          U+20
6:    y     U+79
7:    o     U+6F
8:    u     U+75</code>
</pre>



<br />

--------------------

<br />



# Code Point Util
```javascript
var codePointUtil = graphemejs.codePointUtil;
```

Coming soon...


<br />
### encode
```
codePointUtil.encode(codePoints)
```

Coming soon...


<br />
### decode
```
codePointUtil.decode(str)
```

Coming soon...


<br />
### isOfType
```
codePointUtil.isOfType(codePoint, codePointType_s)
```

Coming soon...


<br />
### isTypeValid
```
codePointUtil.isTypeValid(codePointType)
```

Coming soon...


<br />
### Properties

Name                 | Description
---------------------|------------
`codePointUtil.dict` | Dictionary of code points by name.



<br />

--------------------

<br />



# Grapheme Cluster Util
```javascript
var graphemeClusterUtil = graphemejs.graphemeClusterUtil;
```

Coming soon...


<br />
### extract
```
graphemeClusterUtil.extract(codePoints, [useLegacyClustering])
```

Coming soon...


<br />
### applyCustomClustering
```
graphemeClusterUtil.applyCustomClustering(graphemeClusters)
```

Coming soon...


<br />
### isBoundry
```
graphemeClusterUtil.isBoundry(codePoint1, codePoint2, [useLegacyClustering])
```

Coming soon...


<br />
### shouldBeCustomBoundry
```
graphemeClusterUtil.shouldBeCustomBoundry(graphemeCluster1, graphemeCluster2)
```

Coming soon...



<br />

--------------------

<br />



# Surrogate Pair Util
```javascript
var surrogatePairUtil = graphemejs.surrogatePairUtil;
```

Coming soon...


<br />
### encode
```
surrogatePairUtil.encode(codePoint)
```

Coming soon...


<br />
### decode
```
surrogatePairUtil.decode(highSurrogateCodeUnit, lowSurrogateCodeUnit)
```

Coming soon...


<br />
### isSurrogatePair
```
surrogatePairUtil.isSurrogatePair(codeUnit1, codeUnit2)
```

Coming soon...


<br />
### shouldBeEncoded
```
surrogatePairUtil.shouldBeEncoded(codePoint)
```

Coming soon...



<br />

--------------------

<br />



# Defaults
```javascript
var defaults = graphemejs.defaults;
```

Stores the default values for parameters. These default values are used globally across several functions. Each one can be set to change the default value.

This is a convience so you do not have to specify if you want to use legacy and/or custom clustering every time you call a function that needs that information. Instead, you can set the global defaults once and the functions will use those. However, you can still override the defaults by passing in a value for the associated parameters.

For example, to always use custom clustering by default you can:
```javascript
var graphemejs = require('graphemejs');

graphemejs.extract('hello world'); // will NOT use custom clustering

graphemejs.defaults.useCustomClustering = true;

graphemejs.extract('hello world'); // WILL use custom clustering
```

You can also use the convenience function [`graphemejs.useCustomClustering`](#usecustomclustering) when requiring `graphemejs` (or at any time) like so:
```javascript
var graphemejs = require('graphemejs').useCustomClustering();

graphemejs.extract('hello world'); // WILL use custom clustering
```

At any time you can override the defaults like so:
```javascript
var graphemejs = require('graphemejs');

graphemejs.extract('hello world'); // will NOT use custom clustering
graphemejs.extract('hello world', ..., true); // WILL use custom clustering

graphemejs.defaults.useCustomClustering = true;

graphemejs.extract('hello world'); // WILL use custom clustering
graphemejs.extract('hello world', ..., false); // will NOT use custom clustering

```


<br />
### Properties

Name                                                                       | Value   | Description
---------------------------------------------------------------------------|---------|-----------
`defaults.useLegacyClustering` <a name="defaults-uselegacyclustering"></a> | `false` | The default value for the `useLegacyClustering` parameter. Controls if legacy clustering should be used by default.
`defaults.useCustomClustering` <a name="defaults-usecustomclustering"></a> | `false` | The default value for the `useCustomClustering` parameter. Controls if custom clustering should be used by default.

////////////////// MATRIX LIBRARY

// MULTIPLY TWO MATRICES.

let matrixMultiply = (a,b) => {
   let c = [];

   // LOOP THROUGH THE 4x4 ROWS AND COLUMNS.

   for (let col = 0 ; col < 4 ; col++)
      for (let row = 0 ; row < 4 ; row++) {

         // TAKE A DOT PRODUCT.

         let dp = 0;
	 for (let i = 0 ; i < 4 ; i++)
	    dp += a[4*i + row] * b[4*col + i];

	 c[4*col + row] = dp;
      }

   return c;
}

let matrixInverse = src => {
  let dst = [], det = 0, cofactor = (c, r) => {
     let s = (i, j) => src[c+i & 3 | (r+j & 3) << 2];
     return (c+r & 1 ? -1 : 1) * ( (s(1,1) * (s(2,2) * s(3,3) - s(3,2) * s(2,3)))
                                 - (s(2,1) * (s(1,2) * s(3,3) - s(3,2) * s(1,3)))
                                 + (s(3,1) * (s(1,2) * s(2,3) - s(2,2) * s(1,3))) );
  }
  for (let n = 0 ; n < 16 ; n++) dst.push(cofactor(n >> 2, n & 3));
  for (let n = 0 ; n <  4 ; n++) det += src[n] * dst[n << 2];
  for (let n = 0 ; n < 16 ; n++) dst[n] /= det;
  return dst;
}

// MATRIX PRIMITIVES THAT WE WILL USE FOR ANIMATION.

let matrixIdentity = () => [ 1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1 ];

let matrixTranslate = (a, x,y,z) => {
   let tm = [ 1,0,0,0, 0,1,0,0, 0,0,1,0, x,y,z,1 ];
   return matrixMultiply(a, tm);
}

let matrixRotateX = (a, theta) => {
   let c = Math.cos(theta);
   let s = Math.sin(theta);
   let rm = [ 1,0,0,0, 0,c,s,0, 0,-s,c,0, 0,0,0,1 ];
   return matrixMultiply(a, rm);
}

let matrixRotateY = (a, theta) => {
   let c = Math.cos(theta);
   let s = Math.sin(theta);
   let rm = [ c,0,-s,0, 0,1,0,0, s,0,c,0, 0,0,0,1 ];
   return matrixMultiply(a, rm);
}

let matrixRotateZ = (a, theta) => {
   let c = Math.cos(theta);
   let s = Math.sin(theta);
   let rm = [ c,s,0,0, -s,c,0,0, 0,0,1,0, 0,0,0,1 ];
   return matrixMultiply(a, rm);
}

let matrixScale = (a, x,y,z) => {
   let sm = [ x,0,0,0, 0,y,0,0, 0,0,z,0, 0,0,0,1 ];
   return matrixMultiply(a, sm);
}

let m = [], mTop = 0;
m[0] = matrixIdentity();

mIdentity  = ()      => m[mTop] = matrixIdentity();
mTranslate = (x,y,z) => m[mTop] = matrixTranslate(m[mTop],x,y,z);
mRotateX   = theta   => m[mTop] = matrixRotateX  (m[mTop],theta);
mRotateY   = theta   => m[mTop] = matrixRotateY  (m[mTop],theta);
mRotateZ   = theta   => m[mTop] = matrixRotateZ  (m[mTop],theta);
mScale     = (x,y,z) => m[mTop] = matrixScale    (m[mTop],x,y,z);

mSave = () => {
   m[mTop+1] = m[mTop].slice();
   mTop++;
}

mRestore = () => mTop--;




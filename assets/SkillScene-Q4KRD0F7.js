import{i as e,n as t,s as n,t as r}from"./index-CciFqPmZ.js";import{C as i,E as a,S as o,T as s,_ as c,a as l,b as u,c as d,d as f,f as p,h as m,i as ee,l as h,m as g,n as _,o as v,p as te,r as y,s as b,t as ne,u as x,v as S,w as C,y as w}from"./extends-D6MWew4L.js";var T=n(e()),re=n(t()),E=new C,D=new C,O=new C,k=new i;function ie(e,t,n){let r=E.setFromMatrixPosition(e.matrixWorld);r.project(t);let i=n.width/2,a=n.height/2;return[r.x*i+i,-(r.y*a)+a]}function ae(e,t){let n=E.setFromMatrixPosition(e.matrixWorld),r=D.setFromMatrixPosition(t.matrixWorld),i=n.sub(r),a=t.getWorldDirection(O);return i.angleTo(a)>Math.PI/2}function oe(e,t,n,r){let i=E.setFromMatrixPosition(e.matrixWorld),a=i.clone();a.project(t),k.set(a.x,a.y),n.setFromCamera(k,t);let o=n.intersectObjects(r,!0);if(o.length){let e=o[0].distance;return i.distanceTo(n.ray.origin)<e}return!0}function se(e,t){if(t instanceof c)return t.zoom;if(t instanceof S){let n=E.setFromMatrixPosition(e.matrixWorld),r=D.setFromMatrixPosition(t.matrixWorld),i=t.fov*Math.PI/180,a=n.distanceTo(r);return 1/(2*Math.tan(i/2)*a)}else return 1}function ce(e,t,n){if(t instanceof S||t instanceof c){let r=E.setFromMatrixPosition(e.matrixWorld),i=D.setFromMatrixPosition(t.matrixWorld),a=r.distanceTo(i),o=(n[1]-n[0])/(t.far-t.near),s=n[1]-o*t.far;return Math.round(o*a+s)}}var A=e=>Math.abs(e)<1e-10?0:e;function j(e,t,n=``){let r=`matrix3d(`;for(let n=0;n!==16;n++)r+=A(t[n]*e.elements[n])+(n===15?`)`:`,`);return n+r}var le=(e=>t=>j(t,e))([1,-1,1,1,1,-1,1,1,1,-1,1,1,1,-1,1,1]),ue=(e=>(t,n)=>j(t,e(n),`translate(-50%,-50%)`))(e=>[1/e,1/e,1/e,1,-1/e,-1/e,-1/e,-1,1/e,1/e,1/e,1,1,1,1,1]);function de(e){return e&&typeof e==`object`&&`current`in e}var fe=T.forwardRef(({children:e,eps:t=.001,style:n,className:r,prepend:i,center:a,fullscreen:o,portal:s,distanceFactor:c,sprite:l=!1,transform:u=!1,occlude:d,onOcclude:f,castShadow:p,receiveShadow:m,material:h,geometry:g,zIndexRange:_=[16777271,0],calculatePosition:v=ie,as:te=`div`,wrapperClass:b,pointerEvents:x=`auto`,...S},w)=>{let{gl:E,camera:D,scene:O,size:k,raycaster:j,events:fe,viewport:M}=ee(),[N]=T.useState(()=>document.createElement(te)),P=T.useRef(null),F=T.useRef(null),I=T.useRef(0),L=T.useRef([0,0]),R=T.useRef(null),z=T.useRef(null),B=s?.current||fe.connected||E.domElement.parentNode,V=T.useRef(null),H=T.useRef(!1),U=T.useMemo(()=>d&&d!==`blending`||Array.isArray(d)&&d.length&&de(d[0]),[d]);T.useLayoutEffect(()=>{let e=E.domElement;d&&d===`blending`?(e.style.zIndex=`${Math.floor(_[0]/2)}`,e.style.position=`absolute`,e.style.pointerEvents=`none`):(e.style.zIndex=null,e.style.position=null,e.style.pointerEvents=null)},[d]),T.useLayoutEffect(()=>{if(F.current){let e=P.current=re.createRoot(N);if(O.updateMatrixWorld(),u)N.style.cssText=`position:absolute;top:0;left:0;pointer-events:none;overflow:hidden;`;else{let e=v(F.current,D,k);N.style.cssText=`position:absolute;top:0;left:0;transform:translate3d(${e[0]}px,${e[1]}px,0);transform-origin:0 0;`}return B&&(i?B.prepend(N):B.appendChild(N)),()=>{B&&B.removeChild(N),e.unmount()}}},[B,u]),T.useLayoutEffect(()=>{b&&(N.className=b)},[b]);let W=T.useMemo(()=>u?{position:`absolute`,top:0,left:0,width:k.width,height:k.height,transformStyle:`preserve-3d`,pointerEvents:`none`}:{position:`absolute`,transform:a?`translate3d(-50%,-50%,0)`:`none`,...o&&{top:-k.height/2,left:-k.width/2,width:k.width,height:k.height},...n},[n,a,o,k,u]),G=T.useMemo(()=>({position:`absolute`,pointerEvents:x}),[x]);T.useLayoutEffect(()=>{if(H.current=!1,u){var t;(t=P.current)==null||t.render(T.createElement(`div`,{ref:R,style:W},T.createElement(`div`,{ref:z,style:G},T.createElement(`div`,{ref:w,className:r,style:n,children:e}))))}else{var i;(i=P.current)==null||i.render(T.createElement(`div`,{ref:w,style:W,className:r,children:e}))}});let K=T.useRef(!0);y(e=>{if(F.current){D.updateMatrixWorld(),F.current.updateWorldMatrix(!0,!1);let e=u?L.current:v(F.current,D,k);if(u||Math.abs(I.current-D.zoom)>t||Math.abs(L.current[0]-e[0])>t||Math.abs(L.current[1]-e[1])>t){let t=ae(F.current,D),n=!1;U&&(Array.isArray(d)?n=d.map(e=>e.current):d!==`blending`&&(n=[O]));let r=K.current;n?K.current=oe(F.current,D,j,n)&&!t:K.current=!t,r!==K.current&&(f?f(!K.current):N.style.display=K.current?`block`:`none`);let i=Math.floor(_[0]/2),a=d?U?[_[0],i]:[i-1,0]:_;if(N.style.zIndex=`${ce(F.current,D,a)}`,u){let[e,t]=[k.width/2,k.height/2],n=D.projectionMatrix.elements[5]*t,{isOrthographicCamera:r,top:i,left:a,bottom:o,right:s}=D,u=le(D.matrixWorldInverse),d=r?`scale(${n})translate(${A(-(s+a)/2)}px,${A((i+o)/2)}px)`:`translateZ(${n}px)`,f=F.current.matrixWorld;l&&(f=D.matrixWorldInverse.clone().transpose().copyPosition(f).scale(F.current.scale),f.elements[3]=f.elements[7]=f.elements[11]=0,f.elements[15]=1),N.style.width=k.width+`px`,N.style.height=k.height+`px`,N.style.perspective=r?``:`${n}px`,R.current&&z.current&&(R.current.style.transform=`${d}${u}translate(${e}px,${t}px)`,z.current.style.transform=ue(f,1/((c||10)/400)))}else{let t=c===void 0?1:se(F.current,D)*c;N.style.transform=`translate3d(${e[0]}px,${e[1]}px,0) scale(${t})`}L.current=e,I.current=D.zoom}}if(!U&&V.current&&!H.current)if(u){if(R.current){let e=R.current.children[0];if(e!=null&&e.clientWidth&&e!=null&&e.clientHeight){let{isOrthographicCamera:t}=D;if(t||g)S.scale&&(Array.isArray(S.scale)?S.scale instanceof C?V.current.scale.copy(S.scale.clone().divideScalar(1)):V.current.scale.set(1/S.scale[0],1/S.scale[1],1/S.scale[2]):V.current.scale.setScalar(1/S.scale));else{let t=(c||10)/400,n=e.clientWidth*t,r=e.clientHeight*t;V.current.scale.set(n,r,1)}H.current=!0}}}else{let t=N.children[0];if(t!=null&&t.clientWidth&&t!=null&&t.clientHeight){let e=1/M.factor,n=t.clientWidth*e,r=t.clientHeight*e;V.current.scale.set(n,r,1),H.current=!0}V.current.lookAt(e.camera.position)}});let q=T.useMemo(()=>({vertexShader:u?void 0:`
          /*
            This shader is from the THREE's SpriteMaterial.
            We need to turn the backing plane into a Sprite
            (make it always face the camera) if "transfrom"
            is false.
          */
          #include <common>

          void main() {
            vec2 center = vec2(0., 1.);
            float rotation = 0.0;

            // This is somewhat arbitrary, but it seems to work well
            // Need to figure out how to derive this dynamically if it even matters
            float size = 0.03;

            vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
            vec2 scale;
            scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
            scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );

            bool isPerspective = isPerspectiveMatrix( projectionMatrix );
            if ( isPerspective ) scale *= - mvPosition.z;

            vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale * size;
            vec2 rotatedPosition;
            rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
            rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
            mvPosition.xy += rotatedPosition;

            gl_Position = projectionMatrix * mvPosition;
          }
      `,fragmentShader:`
        void main() {
          gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
        }
      `}),[u]);return T.createElement(`group`,ne({},S,{ref:F}),d&&!U&&T.createElement(`mesh`,{castShadow:p,receiveShadow:m,ref:V},g||T.createElement(`planeGeometry`,null),h||T.createElement(`shaderMaterial`,{side:2,vertexShader:q.vertexShader,fragmentShader:q.fragmentShader})))}),M=parseInt(`184`.replace(/\D+/g,``)),N=M>=125?`uv1`:`uv2`,P=new v,F=new C,I=class extends h{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type=`LineSegmentsGeometry`,this.setIndex([0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5]),this.setAttribute(`position`,new d([-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],3)),this.setAttribute(`uv`,new d([-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],2))}applyMatrix4(e){let t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new x(t,6,1);return this.setAttribute(`instanceStart`,new f(n,3,0)),this.setAttribute(`instanceEnd`,new f(n,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e,t=3){let n;e instanceof Float32Array?n=e:Array.isArray(e)&&(n=new Float32Array(e));let r=new x(n,t*2,1);return this.setAttribute(`instanceColorStart`,new f(r,t,0)),this.setAttribute(`instanceColorEnd`,new f(r,t,t)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new a(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new v);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),P.setFromBufferAttribute(t),this.boundingBox.union(P))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new u),this.boundingBox===null&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){let n=this.boundingSphere.center;this.boundingBox.getCenter(n);let r=0;for(let i=0,a=e.count;i<a;i++)F.fromBufferAttribute(e,i),r=Math.max(r,n.distanceToSquared(F)),F.fromBufferAttribute(t,i),r=Math.max(r,n.distanceToSquared(F));this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error(`THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.`,this)}}toJSON(){}applyMatrix(e){return console.warn(`THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4().`),this.applyMatrix4(e)}},L=class extends I{constructor(){super(),this.isLineGeometry=!0,this.type=`LineGeometry`}setPositions(e){let t=e.length-3,n=new Float32Array(2*t);for(let r=0;r<t;r+=3)n[2*r]=e[r],n[2*r+1]=e[r+1],n[2*r+2]=e[r+2],n[2*r+3]=e[r+3],n[2*r+4]=e[r+4],n[2*r+5]=e[r+5];return super.setPositions(n),this}setColors(e,t=3){let n=e.length-t,r=new Float32Array(2*n);if(t===3)for(let i=0;i<n;i+=t)r[2*i]=e[i],r[2*i+1]=e[i+1],r[2*i+2]=e[i+2],r[2*i+3]=e[i+3],r[2*i+4]=e[i+4],r[2*i+5]=e[i+5];else for(let i=0;i<n;i+=t)r[2*i]=e[i],r[2*i+1]=e[i+1],r[2*i+2]=e[i+2],r[2*i+3]=e[i+3],r[2*i+4]=e[i+4],r[2*i+5]=e[i+5],r[2*i+6]=e[i+6],r[2*i+7]=e[i+7];return super.setColors(r,t),this}fromLine(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}},R=class extends w{constructor(e){super({type:`LineMaterial`,uniforms:o.clone(o.merge([l.common,l.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new i(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
				#include <common>
				#include <fog_pars_vertex>
				#include <logdepthbuf_pars_vertex>
				#include <clipping_planes_pars_vertex>

				uniform float linewidth;
				uniform vec2 resolution;

				attribute vec3 instanceStart;
				attribute vec3 instanceEnd;

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
						attribute vec4 instanceColorStart;
						attribute vec4 instanceColorEnd;
					#else
						varying vec3 vLineColor;
						attribute vec3 instanceColorStart;
						attribute vec3 instanceColorEnd;
					#endif
				#endif

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#ifdef USE_DASH

					uniform float dashScale;
					attribute float instanceDistanceStart;
					attribute float instanceDistanceEnd;
					varying float vLineDistance;

				#endif

				void trimSegment( const in vec4 start, inout vec4 end ) {

					// trim end segment so it terminates between the camera plane and the near plane

					// conservative estimate of the near plane
					float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
					float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
					float nearEstimate = - 0.5 * b / a;

					float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

					end.xyz = mix( start.xyz, end.xyz, alpha );

				}

				void main() {

					#ifdef USE_COLOR

						vLineColor = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

					#endif

					#ifdef USE_DASH

						vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
						vUv = uv;

					#endif

					float aspect = resolution.x / resolution.y;

					// camera space
					vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
					vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

					#ifdef WORLD_UNITS

						worldStart = start.xyz;
						worldEnd = end.xyz;

					#else

						vUv = uv;

					#endif

					// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
					// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
					// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
					// perhaps there is a more elegant solution -- WestLangley

					bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

					if ( perspective ) {

						if ( start.z < 0.0 && end.z >= 0.0 ) {

							trimSegment( start, end );

						} else if ( end.z < 0.0 && start.z >= 0.0 ) {

							trimSegment( end, start );

						}

					}

					// clip space
					vec4 clipStart = projectionMatrix * start;
					vec4 clipEnd = projectionMatrix * end;

					// ndc space
					vec3 ndcStart = clipStart.xyz / clipStart.w;
					vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

					// direction
					vec2 dir = ndcEnd.xy - ndcStart.xy;

					// account for clip-space aspect ratio
					dir.x *= aspect;
					dir = normalize( dir );

					#ifdef WORLD_UNITS

						// get the offset direction as perpendicular to the view vector
						vec3 worldDir = normalize( end.xyz - start.xyz );
						vec3 offset;
						if ( position.y < 0.5 ) {

							offset = normalize( cross( start.xyz, worldDir ) );

						} else {

							offset = normalize( cross( end.xyz, worldDir ) );

						}

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						float forwardOffset = dot( worldDir, vec3( 0.0, 0.0, 1.0 ) );

						// don't extend the line if we're rendering dashes because we
						// won't be rendering the endcaps
						#ifndef USE_DASH

							// extend the line bounds to encompass  endcaps
							start.xyz += - worldDir * linewidth * 0.5;
							end.xyz += worldDir * linewidth * 0.5;

							// shift the position of the quad so it hugs the forward edge of the line
							offset.xy -= dir * forwardOffset;
							offset.z += 0.5;

						#endif

						// endcaps
						if ( position.y > 1.0 || position.y < 0.0 ) {

							offset.xy += dir * 2.0 * forwardOffset;

						}

						// adjust for linewidth
						offset *= linewidth * 0.5;

						// set the world position
						worldPos = ( position.y < 0.5 ) ? start : end;
						worldPos.xyz += offset;

						// project the worldpos
						vec4 clip = projectionMatrix * worldPos;

						// shift the depth of the projected points so the line
						// segments overlap neatly
						vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
						clip.z = clipPose.z * clip.w;

					#else

						vec2 offset = vec2( dir.y, - dir.x );
						// undo aspect ratio adjustment
						dir.x /= aspect;
						offset.x /= aspect;

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						// endcaps
						if ( position.y < 0.0 ) {

							offset += - dir;

						} else if ( position.y > 1.0 ) {

							offset += dir;

						}

						// adjust for linewidth
						offset *= linewidth;

						// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
						offset /= resolution.y;

						// select end
						vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

						// back to clip space
						offset *= clip.w;

						clip.xy += offset;

					#endif

					gl_Position = clip;

					vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

					#include <logdepthbuf_vertex>
					#include <clipping_planes_vertex>
					#include <fog_vertex>

				}
			`,fragmentShader:`
				uniform vec3 diffuse;
				uniform float opacity;
				uniform float linewidth;

				#ifdef USE_DASH

					uniform float dashOffset;
					uniform float dashSize;
					uniform float gapSize;

				#endif

				varying float vLineDistance;

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#include <common>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <clipping_planes_pars_fragment>

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
					#else
						varying vec3 vLineColor;
					#endif
				#endif

				vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

					float mua;
					float mub;

					vec3 p13 = p1 - p3;
					vec3 p43 = p4 - p3;

					vec3 p21 = p2 - p1;

					float d1343 = dot( p13, p43 );
					float d4321 = dot( p43, p21 );
					float d1321 = dot( p13, p21 );
					float d4343 = dot( p43, p43 );
					float d2121 = dot( p21, p21 );

					float denom = d2121 * d4343 - d4321 * d4321;

					float numer = d1343 * d4321 - d1321 * d4343;

					mua = numer / denom;
					mua = clamp( mua, 0.0, 1.0 );
					mub = ( d1343 + d4321 * ( mua ) ) / d4343;
					mub = clamp( mub, 0.0, 1.0 );

					return vec2( mua, mub );

				}

				void main() {

					#include <clipping_planes_fragment>

					#ifdef USE_DASH

						if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

						if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

					#endif

					float alpha = opacity;

					#ifdef WORLD_UNITS

						// Find the closest points on the view ray and the line segment
						vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
						vec3 lineDir = worldEnd - worldStart;
						vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

						vec3 p1 = worldStart + lineDir * params.x;
						vec3 p2 = rayEnd * params.y;
						vec3 delta = p1 - p2;
						float len = length( delta );
						float norm = len / linewidth;

						#ifndef USE_DASH

							#ifdef USE_ALPHA_TO_COVERAGE

								float dnorm = fwidth( norm );
								alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

							#else

								if ( norm > 0.5 ) {

									discard;

								}

							#endif

						#endif

					#else

						#ifdef USE_ALPHA_TO_COVERAGE

							// artifacts appear on some hardware if a derivative is taken within a conditional
							float a = vUv.x;
							float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
							float len2 = a * a + b * b;
							float dlen = fwidth( len2 );

							if ( abs( vUv.y ) > 1.0 ) {

								alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

							}

						#else

							if ( abs( vUv.y ) > 1.0 ) {

								float a = vUv.x;
								float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
								float len2 = a * a + b * b;

								if ( len2 > 1.0 ) discard;

							}

						#endif

					#endif

					vec4 diffuseColor = vec4( diffuse, alpha );
					#ifdef USE_COLOR
						#ifdef USE_LINE_COLOR_ALPHA
							diffuseColor *= vLineColor;
						#else
							diffuseColor.rgb *= vLineColor;
						#endif
					#endif

					#include <logdepthbuf_fragment>

					gl_FragColor = diffuseColor;

					#include <tonemapping_fragment>
					#include <${M>=154?`colorspace_fragment`:`encodings_fragment`}>
					#include <fog_fragment>
					#include <premultiplied_alpha_fragment>

				}
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA=`1`:delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(e){this.uniforms.diffuse.value=e}},worldUnits:{enumerable:!0,get:function(){return`WORLD_UNITS`in this.defines},set:function(e){e===!0?this.defines.WORLD_UNITS=``:delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(e){this.uniforms.linewidth.value=e}},dashed:{enumerable:!0,get:function(){return`USE_DASH`in this.defines},set(e){!!e!=`USE_DASH`in this.defines&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH=``:delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(e){this.uniforms.dashScale.value=e}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(e){this.uniforms.dashSize.value=e}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(e){this.uniforms.dashOffset.value=e}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(e){this.uniforms.gapSize.value=e}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(e){this.uniforms.opacity.value=e}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(e){this.uniforms.resolution.value.copy(e)}},alphaToCoverage:{enumerable:!0,get:function(){return`USE_ALPHA_TO_COVERAGE`in this.defines},set:function(e){!!e!=`USE_ALPHA_TO_COVERAGE`in this.defines&&(this.needsUpdate=!0),e===!0?(this.defines.USE_ALPHA_TO_COVERAGE=``,this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(e)}},z=new s,B=new C,V=new C,H=new s,U=new s,W=new s,G=new C,K=new g,q=new p,pe=new C,J=new v,Y=new u,X=new s,Z,Q;function me(e,t,n){return X.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),X.multiplyScalar(1/X.w),X.x=Q/n.width,X.y=Q/n.height,X.applyMatrix4(e.projectionMatrixInverse),X.multiplyScalar(1/X.w),Math.abs(Math.max(X.x,X.y))}function he(e,t){let n=e.matrixWorld,r=e.geometry,i=r.attributes.instanceStart,a=r.attributes.instanceEnd,o=Math.min(r.instanceCount,i.count);for(let r=0,s=o;r<s;r++){q.start.fromBufferAttribute(i,r),q.end.fromBufferAttribute(a,r),q.applyMatrix4(n);let o=new C,s=new C;Z.distanceSqToSegment(q.start,q.end,s,o),s.distanceTo(o)<Q*.5&&t.push({point:s,pointOnLine:o,distance:Z.origin.distanceTo(s),object:e,face:null,faceIndex:r,uv:null,[N]:null})}}function ge(e,t,n){let r=t.projectionMatrix,i=e.material.resolution,a=e.matrixWorld,o=e.geometry,s=o.attributes.instanceStart,c=o.attributes.instanceEnd,l=Math.min(o.instanceCount,s.count),u=-t.near;Z.at(1,W),W.w=1,W.applyMatrix4(t.matrixWorldInverse),W.applyMatrix4(r),W.multiplyScalar(1/W.w),W.x*=i.x/2,W.y*=i.y/2,W.z=0,G.copy(W),K.multiplyMatrices(t.matrixWorldInverse,a);for(let t=0,o=l;t<o;t++){if(H.fromBufferAttribute(s,t),U.fromBufferAttribute(c,t),H.w=1,U.w=1,H.applyMatrix4(K),U.applyMatrix4(K),H.z>u&&U.z>u)continue;if(H.z>u){let e=H.z-U.z,t=(H.z-u)/e;H.lerp(U,t)}else if(U.z>u){let e=U.z-H.z,t=(U.z-u)/e;U.lerp(H,t)}H.applyMatrix4(r),U.applyMatrix4(r),H.multiplyScalar(1/H.w),U.multiplyScalar(1/U.w),H.x*=i.x/2,H.y*=i.y/2,U.x*=i.x/2,U.y*=i.y/2,q.start.copy(H),q.start.z=0,q.end.copy(U),q.end.z=0;let o=q.closestPointToPointParameter(G,!0);q.at(o,pe);let l=te.lerp(H.z,U.z,o),d=l>=-1&&l<=1,f=G.distanceTo(pe)<Q*.5;if(d&&f){q.start.fromBufferAttribute(s,t),q.end.fromBufferAttribute(c,t),q.start.applyMatrix4(a),q.end.applyMatrix4(a);let r=new C,i=new C;Z.distanceSqToSegment(q.start,q.end,i,r),n.push({point:i,pointOnLine:r,distance:Z.origin.distanceTo(i),object:e,face:null,faceIndex:t,uv:null,[N]:null})}}}var _e=class extends m{constructor(e=new I,t=new R({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type=`LineSegments2`}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,r=new Float32Array(2*t.count);for(let e=0,i=0,a=t.count;e<a;e++,i+=2)B.fromBufferAttribute(t,e),V.fromBufferAttribute(n,e),r[i]=i===0?0:r[i-1],r[i+1]=r[i]+B.distanceTo(V);let i=new x(r,2,1);return e.setAttribute(`instanceDistanceStart`,new f(i,1,0)),e.setAttribute(`instanceDistanceEnd`,new f(i,1,1)),this}raycast(e,t){let n=this.material.worldUnits,r=e.camera;r===null&&!n&&console.error(`LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.`);let i=e.params.Line2===void 0?0:e.params.Line2.threshold||0;Z=e.ray;let a=this.matrixWorld,o=this.geometry,s=this.material;Q=s.linewidth+i,o.boundingSphere===null&&o.computeBoundingSphere(),Y.copy(o.boundingSphere).applyMatrix4(a);let c;if(c=n?Q*.5:me(r,Math.max(r.near,Y.distanceToPoint(Z.origin)),s.resolution),Y.radius+=c,Z.intersectsSphere(Y)===!1)return;o.boundingBox===null&&o.computeBoundingBox(),J.copy(o.boundingBox).applyMatrix4(a);let l;l=n?Q*.5:me(r,Math.max(r.near,J.distanceToPoint(Z.origin)),s.resolution),J.expandByScalar(l),Z.intersectsBox(J)!==!1&&(n?he(this,t):ge(this,r,t))}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(z),this.material.uniforms.resolution.value.set(z.z,z.w))}},ve=class extends _e{constructor(e=new L,t=new R({color:Math.random()*16777215})){super(e,t),this.isLine2=!0,this.type=`Line2`}},ye=T.forwardRef(function({points:e,color:t=16777215,vertexColors:n,linewidth:r,lineWidth:a,segments:o,dashed:c,...l},u){var d;let f=ee(e=>e.size),p=T.useMemo(()=>o?new _e:new ve,[o]),[m]=T.useState(()=>new R),h=(n==null||(d=n[0])==null?void 0:d.length)===4?4:3,g=T.useMemo(()=>{let r=o?new I:new L,a=e.map(e=>{let t=Array.isArray(e);return e instanceof C||e instanceof s?[e.x,e.y,e.z]:e instanceof i?[e.x,e.y,0]:t&&e.length===3?[e[0],e[1],e[2]]:t&&e.length===2?[e[0],e[1],0]:e});if(r.setPositions(a.flat()),n){t=16777215;let e=n.map(e=>e instanceof b?e.toArray():e);r.setColors(e.flat(),h)}return r},[e,o,n,h]);return T.useLayoutEffect(()=>{p.computeLineDistances()},[e,p]),T.useLayoutEffect(()=>{c?m.defines.USE_DASH=``:delete m.defines.USE_DASH,m.needsUpdate=!0},[c,m]),T.useEffect(()=>()=>{g.dispose(),m.dispose()},[g]),T.createElement(`primitive`,ne({object:p,ref:u},l),T.createElement(`primitive`,{object:g,attach:`geometry`}),T.createElement(`primitive`,ne({object:m,attach:`material`,color:t,vertexColors:!!n,resolution:[f.width,f.height],linewidth:r??a??1,dashed:c,transparent:h===4},l)))}),$=r(),be=[{id:`bhhc`,label:`DevSecOps Core`,pos:[0,0,0],color:`#00ff88`,size:.45,category:`core`},{id:`sec`,label:`App Security`,pos:[-3,0,0],color:`#0dcfc0`,size:.26,category:`security`},{id:`back`,label:`Backend Sys`,pos:[3,0,0],color:`#39d353`,size:.26,category:`backend`},{id:`ops`,label:`Cloud & Ops`,pos:[0,0,3],color:`#a3e635`,size:.26,category:`devops`},{id:`lang`,label:`Languages`,pos:[0,0,-3],color:`#818cf8`,size:.26,category:`lang`},{id:`owasp`,label:`OWASP Top 10`,pos:[-5,0,2.2],color:`#0dcfc0`,size:.18,category:`security`},{id:`pentest`,label:`Pen Testing`,pos:[-5.5,0,0],color:`#0dcfc0`,size:.18,category:`security`},{id:`rbac`,label:`RBAC/IAM`,pos:[-5,0,-2.2],color:`#0dcfc0`,size:.18,category:`security`},{id:`spring`,label:`Spring Boot`,pos:[5,0,-2.2],color:`#39d353`,size:.18,category:`backend`},{id:`micro`,label:`Microservices`,pos:[5.5,0,0],color:`#39d353`,size:.18,category:`backend`},{id:`db`,label:`SQL / NoSQL`,pos:[5,0,2.2],color:`#39d353`,size:.18,category:`backend`},{id:`aws`,label:`AWS / Cloud`,pos:[2.2,0,5],color:`#a3e635`,size:.18,category:`devops`},{id:`docker`,label:`Docker / K8s`,pos:[0,0,5.5],color:`#a3e635`,size:.18,category:`devops`},{id:`cicd`,label:`CI/CD Pipelines`,pos:[-2.2,0,5],color:`#a3e635`,size:.18,category:`devops`},{id:`python`,label:`Python / Bash`,pos:[-2.2,0,-5],color:`#818cf8`,size:.18,category:`lang`},{id:`java`,label:`Java / C++`,pos:[0,0,-5.5],color:`#818cf8`,size:.18,category:`lang`},{id:`react`,label:`React / JS`,pos:[2.2,0,-5],color:`#818cf8`,size:.18,category:`lang`}],xe=[[`bhhc`,`sec`],[`bhhc`,`back`],[`bhhc`,`ops`],[`bhhc`,`lang`],[`sec`,`owasp`],[`sec`,`pentest`],[`sec`,`rbac`],[`back`,`spring`],[`back`,`micro`],[`back`,`db`],[`ops`,`aws`],[`ops`,`docker`],[`ops`,`cicd`],[`lang`,`python`],[`lang`,`java`],[`lang`,`react`]];function Se({node:e,onHover:t}){let n=(0,T.useRef)(),r=(0,T.useRef)(),[i,a]=(0,T.useState)(!1);return y(({clock:t})=>{if(!n.current)return;let a=t.elapsedTime,o=Math.sqrt(e.pos[0]**2+e.pos[2]**2);n.current.position.y=e.pos[1]+Math.sin(a*.8+o)*.2;let s=i?1.6:1;n.current.scale.lerp(new C(s,s,s),.12),r.current&&(r.current.material.opacity=i?.22:.06+Math.sin(a*1.5+e.pos[0])*.03)}),(0,$.jsxs)(`group`,{position:[e.pos[0],e.pos[1],e.pos[2]],children:[(0,$.jsxs)(`mesh`,{ref:r,children:[(0,$.jsx)(`sphereGeometry`,{args:[e.size*2.4,16,16]}),(0,$.jsx)(`meshStandardMaterial`,{color:e.color,transparent:!0,opacity:.06,emissive:e.color,emissiveIntensity:.2})]}),(0,$.jsxs)(`mesh`,{ref:n,onPointerEnter:n=>{n.stopPropagation(),a(!0),t(e)},onPointerLeave:()=>{a(!1),t(null)},cursor:`pointer`,children:[(0,$.jsx)(`sphereGeometry`,{args:[e.size,32,32]}),(0,$.jsx)(`meshStandardMaterial`,{color:e.color,emissive:e.color,emissiveIntensity:i?3:1.2,roughness:.1,metalness:.8})]}),e.id===`bhhc`&&(0,$.jsxs)(`mesh`,{rotation:[Math.PI/2,0,0],children:[(0,$.jsx)(`torusGeometry`,{args:[.7,.018,8,60]}),(0,$.jsx)(`meshBasicMaterial`,{color:`#00ff88`,transparent:!0,opacity:.8})]}),(0,$.jsx)(fe,{position:[0,e.size+.28,0],center:!0,style:{pointerEvents:`none`,userSelect:`none`},distanceFactor:10,children:(0,$.jsx)(`div`,{style:{color:i?`#fff`:e.color,fontSize:e.id===`bhhc`?`13px`:`9px`,fontFamily:`JetBrains Mono, monospace`,fontWeight:e.id===`bhhc`?`700`:`500`,whiteSpace:`nowrap`,textShadow:`0 0 8px ${e.color}`,background:i?`${e.color}22`:`transparent`,padding:i?`1px 5px`:`0`,borderRadius:`3px`,transition:`all 0.2s`},children:e.label})}),i&&(0,$.jsx)(`pointLight`,{color:e.color,intensity:3,distance:4})]})}function Ce({from:e,to:t}){let n=be.find(t=>t.id===e),r=be.find(e=>e.id===t);return!n||!r?null:(0,$.jsx)(ye,{points:[new C(...n.pos),new C(...r.pos)],color:`#39d353`,lineWidth:.6,transparent:!0,opacity:.18})}function we(){return(0,$.jsxs)(`group`,{rotation:[Math.PI/2,0,0],children:[(0,$.jsxs)(`mesh`,{children:[(0,$.jsx)(`torusGeometry`,{args:[3,.008,16,100]}),(0,$.jsx)(`meshBasicMaterial`,{color:`#00ff88`,transparent:!0,opacity:.15})]}),(0,$.jsxs)(`mesh`,{children:[(0,$.jsx)(`torusGeometry`,{args:[5.5,.004,16,100]}),(0,$.jsx)(`meshBasicMaterial`,{color:`#0dcfc0`,transparent:!0,opacity:.08})]})]})}function Te({onHover:e}){let t=(0,T.useRef)();return y(({clock:e})=>{t.current&&(t.current.rotation.y=e.elapsedTime*.06)}),(0,$.jsx)(`group`,{rotation:[Math.PI/8,0,0],children:(0,$.jsxs)(`group`,{ref:t,children:[(0,$.jsx)(we,{}),xe.map(([e,t])=>(0,$.jsx)(Ce,{from:e,to:t},`${e}-${t}`)),be.map(t=>(0,$.jsx)(Se,{node:t,onHover:e},t.id))]})})}function Ee({onNodeHover:e}){return(0,$.jsxs)(_,{camera:{position:[0,1,9.5],fov:55},style:{background:`transparent`},gl:{antialias:!0,alpha:!0},dpr:[1,1.5],children:[(0,$.jsx)(`ambientLight`,{intensity:.4,color:`#041a14`}),(0,$.jsx)(`pointLight`,{position:[6,6,6],intensity:1.2,color:`#39d353`}),(0,$.jsx)(`pointLight`,{position:[-6,-6,-6],intensity:.6,color:`#0dcfc0`}),(0,$.jsx)(`pointLight`,{position:[0,0,6],intensity:.4,color:`#818cf8`}),(0,$.jsx)(T.Suspense,{fallback:null,children:(0,$.jsx)(Te,{onHover:e})})]})}export{Ee as default};
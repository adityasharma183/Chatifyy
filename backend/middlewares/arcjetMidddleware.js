import aj from "../utils/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";
export const arcjetProtection=async(req,res,next)=>{
    try {
        const decision=await aj.protect(req)
        if(decision.isDenied()){
            if(decision.reason.isRateLimit()){
                res.status(429).json({message:'Rate limit exceeded.Try again later'})
            }
            else if(decision.reason.isBot()){
                res.status(403).json({message:'Bot access is denied!!'})
            }
            else {
                res.status(403).json({message:'Access denied due to security policies.'})
            }
        }

        ///check for spoofed bots
        if(decision.results.some(isSpoofedBot)){
            res.status(403).json({
                error:'Spoofed bot detected',
                message:'Malicious bot activity detected'
            })
        }
        next()
        
    } catch (error) {
        console.log('Arcjet middleware error');
        
        next()
        
    }

}

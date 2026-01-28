# 🔒 ÉluIA Security Guide

Security best practices and configuration for production deployment.

---

## 📋 Pre-Deployment Security Checklist

### Authentication & Secrets

- [ ] **SECRET_KEY is unique and random**
  - Generated with: `python -c "import secrets; print(secrets.token_urlsafe(32))"`
  - Never use default: `change-this-to-a-random-secret-key-in-production`
  - Minimum 32 characters
  - Store in environment variables only

- [ ] **API keys stored securely**
  - Never committed to Git
  - Set in Railway/Vercel environment variables
  - Separate keys for dev/staging/production
  - Access restricted to authorized team members

- [ ] **Password hashing configured**
  - Using bcrypt (already configured in backend)
  - Salt rounds appropriate (default: 12)
  - No plain text passwords in database

- [ ] **JWT tokens secured**
  - Short expiration (7 days default)
  - HS256 algorithm (secure)
  - Token stored in httpOnly cookies (if possible) or localStorage

### CORS Configuration

- [ ] **CORS origins strictly defined**
  ```json
  ["https://eluia.fr","https://admin.eluia.fr","https://chat.eluia.fr"]
  ```
  - ❌ Never use `"*"` wildcard in production
  - ❌ Never use `http://` in production
  - ✅ Only exact frontend URLs
  - ✅ No trailing slashes

- [ ] **Verify CORS settings**
  ```bash
  curl -H "Origin: https://evil.com" -I https://your-api.railway.app/health
  ```
  Should NOT return `Access-Control-Allow-Origin: https://evil.com`

### Rate Limiting

- [ ] **Rate limiting enabled**
  - Default: 20 requests per IP per day
  - Configured in `RATE_LIMIT_PER_DAY`
  - IP-based tracking with hashing
  - Prevents abuse and DDoS

- [ ] **Test rate limiting**
  ```bash
  # Send 21 requests rapidly
  for i in {1..21}; do curl https://your-chat/api/chat/test/message; done
  ```
  Should return 429 after 20 requests

- [ ] **Rate limit bypass for authenticated users** (if needed)
  - Admin users not rate-limited
  - Configure separately if required

### Database Security

- [ ] **PostgreSQL secured**
  - Strong password (Railway auto-generates)
  - SSL/TLS enabled (Railway default)
  - Not exposed publicly
  - Regular backups enabled (Railway Pro)

- [ ] **SQL injection prevention**
  - Using SQLAlchemy ORM (parameterized queries)
  - No raw SQL with user input
  - Input validation with Pydantic

- [ ] **Database access restricted**
  - Only backend can access database
  - No direct public access
  - Credentials in environment variables only

### API Security

- [ ] **Input validation**
  - Pydantic models for all endpoints
  - Email validation
  - File type validation (PDF, DOCX only)
  - File size limits (50MB default)

- [ ] **Output sanitization**
  - No sensitive data in responses
  - Error messages don't leak system info
  - Stack traces disabled in production

- [ ] **Security headers configured**
  - X-Content-Type-Options: nosniff
  - X-Frame-Options: DENY
  - X-XSS-Protection: 1; mode=block
  - Already in vercel.json

- [ ] **HTTPS enforced**
  - Railway: Automatic
  - Vercel: Automatic
  - No HTTP endpoints in production

### File Upload Security

- [ ] **File validation**
  - Allowed types: PDF, DOCX only
  - Max size: 50MB (configurable)
  - Virus scanning (consider adding ClamAV)

- [ ] **Secure file storage**
  - Files stored outside web root
  - Random filenames (no user input)
  - Access control per candidate

- [ ] **File processing safety**
  - Sandboxed processing
  - Timeout limits
  - Resource limits (memory, CPU)

---

## 🛡️ Runtime Security

### Monitoring & Alerting

- [ ] **Cost monitoring enabled**
  - `DAILY_BUDGET_ALERT_USD` set
  - Alerts when API costs spike
  - Prevents bill shock

- [ ] **Error tracking**
  - Railway logs monitored
  - Vercel logs checked regularly
  - Set up Sentry/error tracking (recommended)

- [ ] **Usage analytics**
  - Track API call volumes
  - Monitor rate limit hits
  - Detect abuse patterns

### API Key Management

- [ ] **Anthropic API key secured**
  - Monthly spending limit set in Anthropic Console
  - Key rotated quarterly
  - Team access restricted

- [ ] **Key rotation plan**
  - Procedure documented
  - Zero-downtime rotation possible
  - Old keys revoked after rotation

### Incident Response

- [ ] **Incident response plan**
  1. Detect issue (monitoring/alerts)
  2. Assess impact
  3. Mitigate (rotate keys, block IPs)
  4. Investigate root cause
  5. Document and improve

- [ ] **Emergency contacts**
  - Railway support
  - Vercel support
  - Team members on-call

---

## 🔐 Data Privacy & GDPR

### Data Collection

**What we collect:**
- ✅ Candidate info: Name, email, election (with consent)
- ✅ Chat messages: Questions and answers (anonymized)
- ✅ IP addresses: Hashed for rate limiting
- ✅ Usage analytics: Aggregate stats

**What we DON'T collect:**
- ❌ Personal identifiable info of voters
- ❌ Raw IP addresses (we hash them)
- ❌ Tracking cookies
- ❌ Third-party analytics (no Google Analytics)

### GDPR Compliance

- [ ] **Data minimization**
  - Only collect what's necessary
  - IP addresses hashed immediately
  - No unnecessary tracking

- [ ] **Right to access**
  - Candidates can export conversations (CSV)
  - API endpoint: `/api/analytics/export-csv`

- [ ] **Right to deletion**
  - Implement account deletion endpoint
  - Delete all associated data
  - Cascade deletes in database

- [ ] **Data retention**
  - Define retention policy (e.g., 1 year)
  - Automated cleanup of old data
  - Document in privacy policy

- [ ] **Privacy policy published**
  - Clear explanation of data usage
  - GDPR-compliant language
  - Easily accessible on website

- [ ] **Cookie consent** (if applicable)
  - Banner for non-essential cookies
  - Opt-in for analytics
  - Respect Do Not Track

### Data Storage

- [ ] **Data location**
  - Railway: Europe region (GDPR compliant)
  - Vercel: Edge network (global)
  - PostgreSQL: EU hosting

- [ ] **Data encryption**
  - In transit: TLS 1.3 (automatic)
  - At rest: Railway default encryption
  - Passwords: bcrypt hashed

---

## 🚨 Common Vulnerabilities & Mitigations

### SQL Injection
**Risk:** Attackers execute malicious SQL queries

**Mitigation:**
- ✅ Using SQLAlchemy ORM (parameterized queries)
- ✅ No raw SQL with user input
- ✅ Input validation with Pydantic

**Test:**
```bash
curl -X POST https://api/auth/login \
  -d '{"email":"admin@test.com' OR '1'='1","password":"x"}'
```
Should fail gracefully.

### Cross-Site Scripting (XSS)
**Risk:** Malicious scripts injected into frontend

**Mitigation:**
- ✅ React auto-escapes content
- ✅ No `dangerouslySetInnerHTML`
- ✅ Content-Security-Policy headers (add if needed)

**Test:**
```bash
# Try injecting script in chat
curl -X POST https://api/chat/test/message \
  -d '{"question":"<script>alert('XSS')</script>"}'
```
Should be escaped in response.

### Cross-Site Request Forgery (CSRF)
**Risk:** Unauthorized actions performed by authenticated users

**Mitigation:**
- ✅ CORS policy prevents cross-origin requests
- ✅ JWT tokens (not cookies, so CSRF-resistant)
- ⚠️ If using cookies, add CSRF tokens

### Brute Force Attacks
**Risk:** Attackers try many passwords

**Mitigation:**
- ✅ Rate limiting (20/day per IP)
- ⚠️ Consider: Account lockout after failed attempts
- ⚠️ Consider: CAPTCHA for login

**Recommendation:** Add progressive delay:
```python
# After 3 failed attempts: delay responses
# After 5 failed attempts: require CAPTCHA
# After 10 failed attempts: temporary IP ban
```

### DDoS Attacks
**Risk:** Service overwhelmed by traffic

**Mitigation:**
- ✅ Rate limiting per IP
- ✅ Railway/Vercel DDoS protection (built-in)
- ⚠️ Consider: Cloudflare for additional layer

### API Key Leakage
**Risk:** Anthropic API key exposed

**Mitigation:**
- ✅ Keys in environment variables
- ✅ Not in Git history
- ✅ .env in .gitignore
- ⚠️ Rotate immediately if suspected leak

**Check for leaks:**
```bash
# Scan Git history for secrets
git log -p | grep -i "anthropic\|sk-ant"

# Use tools like TruffleHog, GitGuardian
```

### Unauthorized Access
**Risk:** Users access other candidates' data

**Mitigation:**
- ✅ JWT authentication required
- ✅ Candidate ID from token (not URL)
- ✅ Database queries filtered by candidate_id

**Test:**
```bash
# Try accessing another candidate's data
curl -H "Authorization: Bearer <token_A>" \
  https://api/analytics/conversations?candidate_id=OTHER_ID
```
Should only return authenticated user's data.

---

## 🔍 Security Audit Checklist

### Before Launch

- [ ] Penetration testing (manual or automated)
- [ ] Dependency audit: `npm audit`, `pip check`
- [ ] OWASP Top 10 review
- [ ] GDPR compliance review
- [ ] Privacy policy published
- [ ] Terms of service published

### Monthly

- [ ] Review Railway logs for anomalies
- [ ] Check cost/usage trends (detect abuse)
- [ ] Update dependencies (security patches)
- [ ] Rotate API keys (quarterly)
- [ ] Test backups (restore procedure)

### After Incidents

- [ ] Root cause analysis
- [ ] Update security measures
- [ ] Document lessons learned
- [ ] Notify affected users (if applicable)

---

## 🛠️ Security Tools & Commands

### Scan Dependencies

```bash
# Backend
cd backend
pip install safety
safety check

# Frontend
cd frontend-*
npm audit
npm audit fix
```

### Check for Secrets in Git

```bash
git log -p | grep -E "sk-ant|sk-proj|password.*=|secret.*="
```

### Test SSL/TLS

```bash
curl -vI https://your-api.railway.app 2>&1 | grep -E "TLS|SSL"
```

Should show: `TLSv1.3`

### Test CORS

```bash
curl -H "Origin: https://evil.com" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -X OPTIONS \
  https://your-api.railway.app/api/auth/login -v
```

Should NOT return `Access-Control-Allow-Origin: https://evil.com`

### Test Rate Limiting

```bash
# Script to test rate limit
for i in {1..25}; do
  echo "Request $i"
  curl -w "%{http_code}\n" -s -o /dev/null \
    https://your-chat/api/chat/test/message \
    -X POST -H "Content-Type: application/json" \
    -d '{"question":"test"}'
done
```

Expect 200 for first 20, then 429.

---

## 📚 Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP REST Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html)
- [GDPR Compliance Guide](https://gdpr.eu/)
- [Railway Security](https://docs.railway.app/reference/platform/security)
- [Vercel Security](https://vercel.com/docs/security/secure-backend-access)

---

## 🆘 Incident Response

### Suspected API Key Leak

1. **Immediate:**
   ```bash
   # Revoke key in Anthropic Console
   # Generate new key
   railway variables --set ANTHROPIC_API_KEY=sk-ant-new-key
   ```

2. **Investigate:**
   - Check Git history
   - Review deployment logs
   - Check Railway/Vercel access logs

3. **Prevent:**
   - Scan all repos with `git-secrets`
   - Add pre-commit hooks
   - Train team on security

### Suspected Data Breach

1. **Immediate:**
   - Assess scope (what data affected?)
   - Contain breach (block access)
   - Notify affected users (GDPR: within 72h)

2. **Investigate:**
   - Review logs for unauthorized access
   - Check database queries
   - Identify entry point

3. **Remediate:**
   - Fix vulnerability
   - Reset affected credentials
   - Enhance monitoring

### Service Abuse

1. **Detect:**
   - Unusual API costs
   - High request volumes
   - Rate limit triggers

2. **Mitigate:**
   - Block abusive IPs
   - Reduce rate limits temporarily
   - Contact Railway/Vercel support

3. **Prevent:**
   - Implement CAPTCHA
   - Require email verification
   - Add more aggressive rate limiting

---

**Last updated:** 2024
**Version:** 1.0

Security is an ongoing process. Review and update regularly. 🛡️

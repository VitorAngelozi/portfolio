package main

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestHealthRoute(t *testing.T) {
	r := newRouter()
	req := httptest.NewRequest(http.MethodGet, "/api/health", nil)
	w := httptest.NewRecorder()

	r.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Fatalf("expected status 200, got %d", w.Code)
	}

	var got map[string]string
	if err := json.Unmarshal(w.Body.Bytes(), &got); err != nil {
		t.Fatalf("failed to decode health response: %v", err)
	}

	if got["status"] != "ok" {
		t.Fatalf("expected status ok, got %q", got["status"])
	}

	if got["service"] != "portfolio-api" {
		t.Fatalf("expected service portfolio-api, got %q", got["service"])
	}
}

func TestProfileRoute(t *testing.T) {
	r := newRouter()
	req := httptest.NewRequest(http.MethodGet, "/api/profile", nil)
	w := httptest.NewRecorder()

	r.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Fatalf("expected status 200, got %d", w.Code)
	}

	var got profileResponse
	if err := json.Unmarshal(w.Body.Bytes(), &got); err != nil {
		t.Fatalf("failed to decode profile response: %v", err)
	}

	if got.Name != "Vitor" {
		t.Fatalf("expected name Vitor, got %q", got.Name)
	}

	if got.CTA.Label != "Me contrate" {
		t.Fatalf("expected cta label Me contrate, got %q", got.CTA.Label)
	}

	if got.CTA.Href != "#contato" {
		t.Fatalf("expected cta href #contato, got %q", got.CTA.Href)
	}
}
